import type p5Types from "p5";
import {Heart as Particle, ParticleConfig} from "./particle";
import {sec} from "@/utils/timer";
import breath from "@/utils/breath";
import {createHeartPos} from "@/utils";

export class ParticleSystem {
  origin: p5Types.Vector;

  private particles: Particle[];
  private p5: p5Types;
  private sec: number;
  private index: number;
  private refPos: p5Types.Vector;
  private size: number;
  img?: p5Types.Image;

  constructor(position: any, p5: p5Types, index: number, refPos: p5Types.Vector, img?: p5Types.Image) {
    this.origin = position.copy();
    this.refPos = refPos;
    this.sec = sec();
    this.index = index;
    this.img = img;

    const { x, y } = this.origin;
    this.p5 = p5;
    this.size = 10;
    this.particles = [new Particle({
      p5: this.p5,
      size: this.size,
      position: p5.createVector(x, y - 5),
      immortal: true,
    })];
  }

  updatePos(position: p5Types.Vector) {
    this.origin = position;
  }

  getSecPass() {
    return sec() - this.sec;
  }

  getHeartPos(scale: number) {
    const i = this.index || 0;
    const pos = this.refPos;
    const { x, y } = createHeartPos(i);
    const scaledX = x * scale + 50 + (pos?.x || 0);
    const scaledY = y * scale + 50 + (pos?.y || 0);

    return this.p5.createVector(scaledX, scaledY)
  };

  addParticle(config?: ParticleConfig) {
    this.particles.push(new Particle(Object.assign({}, {
      position: this.origin,
      p5: this.p5,
      img: this.img,
    }, config)));
  }

  update() {
    this.updatePos(this.getHeartPos(
      breath(this.getSecPass(), 50, 60)
    ));
    this.size = breath(
      this.getSecPass(), 10, 15
    );
  }

  addHeartPair(x: number, y: number) {
    const { p5 } = this;
    this.addParticle({
      p5,
      position: p5.createVector(x - 7, y + 2),
      immortal: true,
      beat: true,
      float: true
    });
    this.addParticle({
      p5,
      position: p5.createVector(x, y),
      immortal: true,
      beat: true,
      float: true,
    });
  }

  run() {
    this.update();
    this.addParticle();

    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
      if (p.immortal && !p.float) {
        p.moveTo(this.p5.createVector(this.origin.x, this.origin.y - 5));
        p.scaleTo(this.size);
      }
    }
  }
}
