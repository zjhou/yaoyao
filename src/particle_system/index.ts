import type p5Types from "p5";
import { Heart as Particle } from "./particle";

export class ParticleSystem {
  origin: p5Types.Vector;

  private particles: Particle[];
  private p5: p5Types;

  constructor(position: any, p5: p5Types) {
    this.origin = position.copy();
    this.p5 = p5;
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle({
      position: this.origin,
      p5: this.p5
    }));
  }

  run() {
    this.addParticle();
    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}
