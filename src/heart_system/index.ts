import p5Types from "p5";
import {ParticleSystem} from "../particle_system";
import {createHeartPos} from "../utils";
import {timer} from "../utils/timer";

type HeartConfig = {
  p5: p5Types;
  count?: number;
  size?: number
}

export class HeartSystem {
  private readonly count: number;
  readonly ps: ParticleSystem[];
  private readonly p5: p5Types;
  position: p5Types.Vector;
  private size: number;

  constructor(position: p5Types.Vector, config: HeartConfig) {
    const {
      count,
      size,
      p5,
    } = config;

    this.p5 = p5;
    this.ps = [];

    this.count = count || 40;
    this.position = position;
    this.size = size || 50;
  }

  addHeartPs(position: p5Types.Vector, index: number) {
    this.ps.push(new ParticleSystem(position, this.p5, index, this.position))
  }

  display(pos: p5Types.Vector = this.position) {
    const start = 0;
    const end = 2 * 3.14;
    const count = this.count;
    const step = (end - start) / count;

    for(let i = start; i <= end; i+= step) {
      const { x, y } = createHeartPos(i);
      const scaledX = x * 50 + 50 + (pos?.x || 0);
      const scaledY = y * 50 + 50 + (pos?.y || 0);

      this.addHeartPs(this.p5.createVector(scaledX, scaledY), i)
    }
  }

  showTimer(x: number, y: number) {
    const { timeStr } = timer();
    const { p5 } = this;
    p5.textFont('monospace');
    p5.fill(251, 93, 99);
    p5.text(timeStr + ' 天', x, y);
  }

  showHeartPair(x: number, y: number) {
    this.ps[0].addHeartPair(x, y)
  }

  run() {
    for (let i = this.ps.length - 1; i >= 0; i--) {
      let p = this.ps[i];
      p.run();
    }
  }
}
