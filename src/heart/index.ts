import p5Types from "p5";

type HeartConfig = {
  count: number
  size?: number
}
export class Heart {
  private count: number;
  private position: p5Types.Vector;
  private size: number;
  constructor(position: p5Types.Vector, config: HeartConfig) {
    const {
      count,
      size
    } = config;

    this.count = count;
    this.position = position;
    this.size = size || 50;
  }


}
