import type p5Types from "p5";
import { scale } from "@/utils";
import breath from "@/utils/breath";
import {sec} from "@/utils/timer";

interface Particle {
  lifespan: number;
  size: number;

  position: p5Types.Vector;
  velocity: p5Types.Vector;
  acceleration?:p5Types.Vector
  p5: p5Types;

  update: () => void;
  display: (size: number) => void;
  run: () => void;
  isDead: () => boolean;
}

export type ParticleConfig = {
  p5: p5Types,
  position: p5Types.Vector;
  velocity?: p5Types.Vector;
  acceleration?: p5Types.Vector

  opacity?: number;
  lifespan?: number;
  size?: number;

  immortal?: boolean,
  float?: boolean,
  beat?: boolean,

  img?: p5Types.Image;
}

const MAX_LIFE_SPAN = 80;
const MAX_SIZE = 12;

export class Heart implements Particle {
  position: p5Types.Vector;
  velocity: p5Types.Vector;
  acceleration:p5Types.Vector;
  lifespan: number;
  size: number;
  immortal: boolean;
  float: boolean;
  p5: p5Types;
  img?: p5Types.Image;
  private age: number;
  private beat: boolean | undefined;
  private birthSec: number;

  constructor(config: ParticleConfig) {
    const {
      p5,
      acceleration,
      velocity,
      immortal,
      float,
      position,
      size,
      img,
      beat,
    } = config;

    const {
      createVector,
    } = p5;

    this.p5 = p5;
    this.size = size || MAX_SIZE;
    this.acceleration = acceleration || createVector(0, 0.08);
    this.velocity = velocity || createVector(p5.random(-1, 1), p5.random(-1, 0));
    this.position = position.copy();
    this.lifespan = MAX_LIFE_SPAN;
    this.immortal = immortal || false;
    this.float = float || false;
    this.p5 = p5;
    this.age = 0;
    this.birthSec = sec();
    this.img = img;
    this.beat = beat;
  }

  run() {
    this.update();
    this.display();
  }

  moveTo(pos: p5Types.Vector) {
    this.position = pos;
  }

  scaleTo(size: number) {
    this.size = size;
  }

  getRealAge() {
    return sec() - this.birthSec;
  }

  update() {
    this.age += 1 / 5;

    if (!this.immortal && !this.float) {
      this.velocity.add(this.acceleration);
      this.lifespan -= 2;
    }

    if (this.float) {
      this.position.add(
        this.p5.sin(this.age) / 6,
        this.p5.cos(this.age) / 6
      );
    } else {
      this.position.add(this.velocity);
    }

    if (this.beat) {
      this.size = breath(this.getRealAge(), MAX_SIZE - 3, MAX_SIZE);
    }
  }

  display() {
    const { p5, position, lifespan, immortal, img } = this;
    const { x, y } = position;
    const size = scale(lifespan, MAX_LIFE_SPAN, this.size || MAX_SIZE);
    const maxOpacity = immortal ? 255 : 200;
    if (img && size > 0) {
      p5.image(img, x, y, size * 5, size * 5)
      return;
    }

    p5.fill(251, 93, 99, scale(lifespan, MAX_LIFE_SPAN, maxOpacity));
    p5.stroke(251, 192, 93, lifespan);
    p5.strokeWeight(2);
    p5.beginShape();
    p5.vertex(x, y);
    p5.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    p5.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    p5.endShape(p5.CLOSE);
  }

  isDead() {
    return this.lifespan < 0;
  }
}
