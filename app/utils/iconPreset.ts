import iosIcons from '../constants/ios/icons.json';
import androidIcons from '../constants/android/icons.json';

export interface IPresetOutput {
  width: number;
  height: number;
  fileName: string;
}

export const generateApplePresetLabel = (idiom: string): string => {
  if (idiom === 'iphone') return 'iPhone';
  if (idiom === 'ipad') return 'iPad';
  if (idiom === 'ios-marketing') return 'iOS Marketing';
  if (idiom === 'car') return 'Car';
  if (idiom === 'mac') return 'Mac';
  if (idiom === 'watch') return 'Watch';
  if (idiom === 'watch-marketing') return 'Watch Marketing';
  return '';
};

export const generateApplePresetIdioms = () => {
  const idioms = iosIcons.images.map((x) => {
    return x.idiom;
  });
  const unique = [...new Set(idioms)];
  return unique;
};

export const generateAppleIconPreset = (presetName = ''): IPresetOutput[] => {
  let sizes = iosIcons.images;
  if (presetName !== '') {
    sizes = iosIcons.images.filter((x) => {
      return x.idiom === presetName;
    });
  }
  const prepared = sizes.map(
    (x): IPresetOutput => {
      const size = x.size.split('x');
      const width = parseInt(size[0], 10);
      const height = parseInt(size[1], 10);
      const scale = parseInt(x.scale.replace('x', ''), 10);

      return {
        width: width * scale,
        height: height * scale,
        fileName: `icon_${width}@${x.scale}.png`,
        // fileName: `icon-${x.size}${scale > 1 ? '@' : ''}${
        //   scale > 1 ? x.scale : ''
        // }.png`,
      };
    }
  );

  return prepared;
};

export const generateAndroidIconPreset = (): IPresetOutput[] => {
  const sizes = androidIcons.images;
  const prepared = sizes.map(
    (x): IPresetOutput => {
      const size = x.dimension;

      return {
        width: size,
        height: size,
        fileName: x.file,
      };
    }
  );

  return prepared;
};
