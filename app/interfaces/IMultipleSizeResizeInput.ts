import { IImageInfo } from './IImageInfo';
import { ISize } from './ISize';

export interface IMultipleSizeResizeInput {
  sizes: ISize[];
  file: IImageInfo;
  destinationPath: string;
  preset: string;
  backgroundFillColor: string;
  allowFillColor: boolean;
}
