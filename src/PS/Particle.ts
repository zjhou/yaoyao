import type p5Types from "p5";
import breath from "../utils/breath";
import {sec} from "../utils/timer";

export interface ParticleOption {
    immortal?: boolean,
    size?: number,
    index?: number,
    float?: boolean,
    beat?: boolean,
    randomFloat?: boolean,
    originPos?: p5Types.Vector,
}

export class Particle {
    private lifespan: number;
    private age: number;
    private velocity: any;
    private p5: p5Types;
    private acceleration: any;
    private position: any;
    private immortal: boolean;
    private size: number;
    private beat: boolean;
    private float: boolean;
    private opacity: number;
    private index: number | undefined;
    private sec: number;
    private originPos: p5Types.Vector;
    private randomFloat: boolean;

    constructor(
      p5Inst: p5Types,
      position: p5Types.Vector,
      option: ParticleOption
    ) {
        this.p5 = p5Inst;

        const {
            index,
            immortal = false,
            size = 12,
            beat = false,
            float = false,
            randomFloat = false,
            originPos = p5Inst.createVector(0, 0),
        } = option;

        this.position = position;
        this.immortal = immortal;
        this.size = size;
        this.beat = beat;
        this.float = float;
        this.velocity = p5Inst.createVector(p5Inst.random(-1, 1), p5Inst.random(-1, 0));
        this.acceleration = p5Inst.createVector(0, 0.05);
        this.lifespan = 200;
        this.opacity = 200;
        this.originPos = originPos;
        this.index = index;
        this.sec = sec();
        this.randomFloat = randomFloat;
        this.age = 0;
    }

    getHeartPos(scale: number) {
        const i = this.index || 0;
        const pos = this.originPos;
        const x = 2 * Math.pow(Math.sin(i), 3);
        const y = - 2 * ((13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)) / 16)

        const scaledX = x * scale + 50 + (pos?.x || 0);
        const scaledY = y * scale + 50 + (pos?.y || 0);

        return this.p5.createVector(scaledX, scaledY)
    };

    getSecPass() {
        return sec() - this.sec;
    }
    update() {
        this.velocity.add(this.acceleration);
        this.age += 1 / 60;

        if (this.float) {
            this.position.add(
              this.p5.sin(this.age) / 20,
              this.p5.cos(this.age) / 20
            );
        }

        if (!this.immortal) {
            this.lifespan -= 2;
        }

        if (this.beat) {
            this.position = this.getHeartPos(
              breath(this.getSecPass(), 50, 65)
            );
            this.size = breath(
              this.getSecPass(), 12, 10
            );
            this.opacity = breath(
              this.getSecPass(),
              255,
              90
            );
        }

        if (this.randomFloat) {
            this.position.add(
              this.p5.sin(this.age * this.p5.random(10, 13)) * 10,
              this.p5.cos(this.age * this.p5.random(10, 13)) * 10,
            );
            this.size = this.p5.random(7, 10);
            this.opacity = this.p5.random(100, 200);
        }

    };

    display(size:number) {
        const { p5, position, opacity} = this;
        const { x, y } = position;
        p5.fill(251, 93, 99, opacity);
        p5.stroke(251, 192, 93, opacity);
        p5.strokeWeight(2);
        p5.beginShape();
        p5.vertex(x, y);
        p5.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        p5.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        p5.endShape(p5.CLOSE);
    }

    run() {
        this.update();
        this.display(this.size);
    }

    isDead() {
        return this.lifespan < 0;
    }
}

