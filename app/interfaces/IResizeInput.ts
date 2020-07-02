import { IImageInfo } from './IImageInfo';

export interface IResizeInput {
  width: number;
  height: number;
  infos: IImageInfo[];
  destinationPath: string;
  fit: string;
  quality: number;
  backgroundFillColor: string;
  allowFillColor: boolean;
}
