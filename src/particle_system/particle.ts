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

type ParticleConfig = {
  p5: p5Types,
  position: p5Types.Vector;
  velocity?: p5Types.Vector;
  acceleration?: p5Types.Vector

  opacity?: number;
  lifespan?: number;
  size?: number;
}

const MAX_LIFE_SPAN = 70;
const MAX_SIZE = 10;

export class Heart implements Particle {
  position: p5Types.Vector;
  velocity: p5Types.Vector;
  acceleration:p5Types.Vector;
  lifespan: number;
  size: number;
  p5: p5Types;

  constructor(config: ParticleConfig) {
    const {
      p5,
      acceleration,
      velocity,
      position,
      size,
    } = config;
    const {
      createVector,
    } = p5;
    this.p5 = p5;
    this.size = size || MAX_SIZE;
    this.acceleration = acceleration || createVector(0, 0.05);
    this.velocity = velocity || createVector(p5.random(-1, 1), p5.random(-1, 0));
    this.position = position.copy();
    this.lifespan = MAX_LIFE_SPAN;
    this.p5 = p5;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  display() {
    const { p5, position, lifespan } = this;
    const { x, y } = position;
    const size = scale(lifespan, MAX_LIFE_SPAN, MAX_SIZE);
    p5.fill(251, 93, 99, scale(lifespan, MAX_LIFE_SPAN, 255));
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
