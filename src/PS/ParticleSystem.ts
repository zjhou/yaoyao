import type p5Types from "p5";
import { timer } from "../utils/timer";
import {Particle, ParticleOption} from "./Particle";

export class ParticleSystem {
    origin: any;
    private particles: Particle[];
    private p5: p5Types;

    constructor(position: any, p5: p5Types) {
        this.origin = position.copy();
        this.p5 = p5;
        this.particles = [];
    }

    addParticle(pos: p5Types.Vector, option: ParticleOption) {
        this.particles.push(new Particle(this.p5, pos, option));
    }

    addHeartPair(x: number = this.origin.x, y = this.p5.height - 90) {
        const { p5 } = this;
        this.addParticle(p5.createVector(x - 12, y), {
            immortal: true,
            float: true,
            size: 12,
        });
        this.addParticle(p5.createVector(x, y), {
            immortal: true,
            float: true,
            size: 12,
        });
    }

    addHeartParticles(pos?: p5Types.Vector, heartNum?: number, random?: boolean) {
        const start = 0;
        const end = 2 * 3.14;
        const count = heartNum || 60;
        const step = (end - start) / count;

        for(let i = start; i <= end; i+= step) {
            const x = 2 * Math.pow(Math.sin(i), 3);
            const y = - 2 * ((13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)) / 16)

            const scaledX = x * 50 + 50 + (pos?.x || 0);
            const scaledY = y * 50 + 50 + (pos?.y || 0);

            this.addParticle(this.p5.createVector(scaledX, scaledY), {
                originPos: pos,
                immortal: true,
                size: 10,
                beat: true,
                index: i,
                randomFloat: random
            });
        }
    }

    reposition(position: any) {
        this.origin = position.copy();
    }

    showTimer(x: number, y: number) {
        const { timeStr } = timer();
        const { p5 } = this;
        p5.textFont('monospace');
        p5.fill(251, 93, 99);
        p5.text(timeStr + ' 天', x, y);
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    };
}
