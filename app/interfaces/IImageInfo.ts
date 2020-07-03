import sharp from 'sharp';

interface Meta {
  /** Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg */
  format?: string;
  /** Total size of image in bytes, for Stream and Buffer input only */
  size?: number;
  /** Number of pixels wide (EXIF orientation is not taken into consideration) */
  width?: number;
  /** Number of pixels high (EXIF orientation is not taken into consideration) */
  height?: number;
  /** Name of colour space interpretation e.g. srgb, rgb, cmyk, lab, b-w ... */
  space?: string;
  /** Name of pixel depth format e.g. uchar, char, ushort, float ... */
  depth?: string;
  /** Number of pixels per inch (DPI), if present */
  density?: number;
  /** String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK */
  chromaSubsampling: string;
  /** Boolean indicating whether the image is interlaced using a progressive scan */
  isProgressive?: boolean;
  /** Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP */
  pages?: number;
  /** Number of pixels high each page in a multi-page image will be. */
  pageHeight?: number;
  /** Number of times to loop an animated image, zero refers to a continuous loop. */
  loop?: number;
  /** Delay in ms between each page in an animated image, provided as an array of integers. */
  delay?: number[];
  /**  Number of the primary page in a HEIF image */
  pagePrimary?: number;
  /** Boolean indicating the presence of an embedded ICC profile */
  hasProfile?: boolean;
  /** Boolean indicating the presence of an alpha transparency channel */
  hasAlpha?: boolean;
}

export interface IImageInfo {
  base64: string;
  meta: Meta;
  path: string;
  name: string;
  id: string;
  aspectRatio: number;
  size: number;
}
