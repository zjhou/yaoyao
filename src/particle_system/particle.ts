import type p5Types from "p5";
import { scale } from "../utils";

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
}

const MAX_LIFE_SPAN = 60;
const MAX_SIZE = 10;

export class Heart implements Particle {
  position: p5Types.Vector;
  velocity: p5Types.Vector;
  acceleration:p5Types.Vector;
  lifespan: number;
  size: number;
  immortal: boolean;
  float: boolean;
  p5: p5Types;
  private age: number;

  constructor(config: ParticleConfig) {
    const {
      p5,
      acceleration,
      velocity,
      immortal,
      float,
      position,
      size,
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
  }

  display() {
    const { p5, position, lifespan, immortal } = this;
    const { x, y } = position;
    const size = scale(lifespan, MAX_LIFE_SPAN, this.size || MAX_SIZE);
    const maxOpacity = immortal ? 255 : 200;
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
