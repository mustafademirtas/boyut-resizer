import sharp from 'sharp';

export interface IImageInfo {
  base64: string;
  meta: sharp.Metadata;
  path: string;
  name: string;
  id: string;
  aspectRatio: number;
  size: number;
}
