import type p5Types from "p5";
import { timer } from "../utils/timer";
import {Particle, ParticleOption} from "./Particle";

export class ParticleSystem {
    private particles: Particle[];
    origin: any;
    private p5: p5Types;

    constructor(position: any, p5: p5Types) {
        this.origin = position.copy();
        this.p5 = p5;
        this.particles = [];
    }

    addParticle(pos: p5Types.Vector, option: ParticleOption) {
        this.particles.push(new Particle(this.p5, pos, option));
    }

    addHeartPair(x: number = this.origin.x, y = this.p5.height - 70) {
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

    addHeartParticles(pos?: p5Types.Vector) {
        const start = 0;
        const end = 2 * 3.14;
        const count = 30;
        const step = (end - start) / count;

        for(let i = start; i <= end; i+= step) {
            const x = 2 * Math.pow(Math.sin(i), 3);
            const y = - 2 * ((13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)) / 16)
            this.addParticle(this.p5.createVector(x * 20 + 50 + (pos?.x || 0), y * 20 + 50 + (pos?.y || 0)), {
                immortal: true,
                size: 7,
                beat: true
            });
        }
    }

    reposition(position: any) {
        this.origin = position.copy();
    }

    showTimer(x: number, y: number) {
        const { timeStr } = timer();
        const { p5 } = this;
        p5.text(timeStr, x, y);
        p5.text('天', x + 130, y);
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
