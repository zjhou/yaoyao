import type p5Types from "p5";

export interface ParticleOption {
   immortal?: boolean,
   size?: number,
   float?: boolean,
   beat?: boolean,
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

    constructor(
      p5Inst: p5Types,
      position: p5Types.Vector,
      option: ParticleOption
    ) {
        this.p5 = p5Inst;
        const {
            immortal = false,
            size = 12,
            beat = false,
            float = false,
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
        this.age = 0;
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
            this.size += this.p5.sin(this.age) / 15
            this.opacity += this.p5.sin(this.age)* 10 + 10;
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

