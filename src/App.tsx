import { useState } from 'react'
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import reactLogo from './assets/react.svg'
import './App.css'

let x = 50;
const y = 50;

function heart(x, y, size, p5, opacity) {
  p5.fill(251, 93, 99, opacity);
  p5.stroke(251, 192, 93, opacity);
  p5.strokeWeight(2);
  p5.beginShape();
  p5.vertex(x, y);
  p5.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  p5.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  p5.endShape(p5.CLOSE);
}

let system;
// A simple Particle class
let Particle = function(position, p5) {
  this.acceleration = p5.createVector(0, 0.05);
  this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function(p5) {
  this.update();
  this.display(p5);
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function(p5) {
  heart(this.position.x, this.position.y, 12, p5, this.lifespan);
  // p5.stroke(251, 192, 93, this.lifespan);
  // p5.strokeWeight(2);
  // p5.fill(251, 93, 99, this.lifespan);
  // p5.ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(p5) {
  this.particles.push(new Particle(this.origin, p5));
};

ParticleSystem.prototype.run = function(p5) {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run(p5);
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
function App() {
  const [count, setCount] = useState(0)
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(innerWidth, innerHeight);
    system = new ParticleSystem(p5.createVector(p5.width / 2, p5.height / 2 - 20));
  };
  const draw = (p5: p5Types) => {
    p5.background(251, 192, 93);
    system.addParticle(p5);
    system.run(p5);
  };
  return (
    <>
      <Sketch setup={setup} draw={draw} />
      <div className="coming">COMING SOON...</div>
    </>
  );
}

export default App
