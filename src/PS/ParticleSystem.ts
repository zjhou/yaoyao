import type p5Types from "p5";
import { Particle } from "./Particle";

export class ParticleSystem {
    private particles: Particle[];
    origin: any;
    private p5: p5Types;

    constructor(position: any, p5: p5Types) {
        this.origin = position.copy();
        this.p5 = p5;
        this.particles = [];
    }

    addParticle(pos?: p5Types.Vector, immortal?: boolean) {
        this.particles.push(new Particle(pos || this.origin, this.p5, immortal));
    }

    reposition(position: any) {
        this.origin = position.copy();
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
