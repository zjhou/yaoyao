import type p5Types from "p5";

export class Particle {
    private lifespan: number;
    private velocity: any;
    private p5: p5Types;
    private acceleration: any;
    private position: any;

    constructor(position: any, p5Inst: p5Types) {
        this.p5 = p5Inst;
        this.acceleration = p5Inst.createVector(0, 0.05);
        this.velocity = p5Inst.createVector(p5Inst.random(-1, 1), p5Inst.random(-1, 0));
        this.position = position.copy();
        this.lifespan = 255;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    };

    display(size:number) {
        const { p5, position } = this;
        const { x, y } = position;
        p5.fill(251, 93, 99, this.lifespan);
        p5.stroke(251, 192, 93, this.lifespan);
        p5.strokeWeight(2);
        p5.beginShape();
        p5.vertex(x, y);
        p5.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        p5.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        p5.endShape(p5.CLOSE);
    }

    run() {
        this.update();
        this.display(12);
    }

    isDead() {
        return this.lifespan < 0;
    }
}

