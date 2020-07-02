/* eslint-disable class-methods-use-this */
class AspectRatio {
  public calculateRatio(width: number, height: number): number {
    const ratio = width / height;
    return ratio;
  }

  public calculateWidth(height: number, ratio: number): number {
    const mHeight = height * ratio;
    return Math.round(mHeight);
  }

  public calculateHeight(width: number, ratio: number): number {
    const mWidth = width / ratio;
    return Math.round(mWidth);
  }
}

export default new AspectRatio();
