/* eslint-disable no-restricted-globals */
/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import sharp from 'sharp';
import { v4 } from 'uuid';
import archiver from 'archiver';

import MenuBuilder from './menu';
import { IImageInfo } from './interfaces/IImageInfo';
import { ISelectedFile } from './interfaces/ISelectedFiles';
import { imageFileExtensions } from './utils/config';
import AspectRatio from './utils/aspectRatio';
import { IResizeInput } from './interfaces/IResizeInput';
import randomZipFileName from './utils/randomZipFileName';

const fs = require('fs');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 750,
    minHeight: 550,
    width: 1024,
    height: 728,
    frame: false,
    webPreferences:
      (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
            webSecurity: false,
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
          },
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

async function ImageInfoExtractor(fPath: string): Promise<IImageInfo> {
  const image = sharp(fPath);
  const imageMdata = await image.metadata();
  const stats = fs.statSync(fPath);

  const aspectRatio = AspectRatio.calculateRatio(
    imageMdata.width!,
    imageMdata.height!
  );

  const info: IImageInfo = {
    base64: `data:image/${imageMdata.format};base64, `,
    id: v4(),
    meta: imageMdata,
    path: fPath,
    name: path.basename(fPath),
    aspectRatio,
    size: stats.size,
  };
  return info;
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on(
  'select-file',
  async (event: Electron.IpcMainEvent, arg: ISelectedFile[]) => {
    let filePaths: string[] = [];
    let imageInfos: IImageInfo[] = [];

    if (!arg) {
      const result = await dialog.showOpenDialog(mainWindow!, {
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Images', extensions: imageFileExtensions }],
      });

      if (result.canceled) {
        return;
      }

      filePaths = result.filePaths;
    } else {
      filePaths = arg.map((x) => x.path);
    }

    const promises = filePaths.map((x) => {
      return ImageInfoExtractor(x);
    });

    imageInfos = await Promise.all(promises);

    mainWindow?.webContents.send('file-read', imageInfos);
  }
);

ipcMain.on('resize-request', async (event, arg: IResizeInput) => {
  const destinationFile = `${arg.destinationPath}/${randomZipFileName()}.zip`;
  const output = fs.createWriteStream(destinationFile);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    );
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', () => {
    console.log('Data has been drained');
  });

  // good practice to catch this error explicitly
  archive.on('error', (err: any) => {
    throw err;
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', (err: any) => {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // pipe archive data to the file
  archive.pipe(output);

  // eslint-disable-next-line no-restricted-syntax
  for (const iterator of arg.infos) {
    const opts: sharp.ResizeOptions = {};
    opts.fit = arg.fit as any;

    if (!isNaN(arg.width)) {
      opts.width = arg.width;
    }

    if (!isNaN(arg.height)) {
      opts.height = arg.height;
    }

    // Start Pipe
    const pipe = sharp(iterator.path);

    // If format jpeg add quality
    if (iterator.meta.format === 'jpeg') {
      pipe.jpeg({ quality: arg.quality });
    }

    if (iterator.meta.format === 'webp') {
      pipe.webp({ quality: arg.quality });
    }

    if (iterator.meta.format === 'png') {
      pipe.png({ quality: arg.quality });
      if (arg.allowFillColor) {
        pipe.flatten({ background: arg.backgroundFillColor });
      }
    }

    // Resize
    pipe.resize(opts);

    // To buffer
    // eslint-disable-next-line no-await-in-loop
    const buffer = await pipe.toBuffer();

    archive.append(buffer, {
      // name: `${iterator.name}.${iterator.meta.format}`,
      name: `${iterator.name}`,
    });
  }

  await archive.finalize();
  shell.showItemInFolder(destinationFile);
});
