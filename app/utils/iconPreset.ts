import iosIcons from '../constants/ios/icons.json';
import androidIcons from '../constants/android/icons.json';

export interface IPresetOutput {
  width: number;
  height: number;
  fileName: string;
}

export const iosIconPreset = (): IPresetOutput[] => {
  const sizes = iosIcons.images;
  const prepared = sizes.map(
    (x): IPresetOutput => {
      const size = x.size.split('x');
      const width = parseInt(size[0], 10);
      const height = parseInt(size[1], 10);
      const scale = parseInt(x.scale.replace('x', ''), 10);

      return {
        width: width * scale,
        height: height * scale,
        fileName: `icon-${x.size}${scale > 1 ? '@' : ''}${
          scale > 1 ? x.scale : ''
        }.png`,
      };
    }
  );

  return prepared;
};

export const androidIconPreset = (): IPresetOutput[] => {
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
