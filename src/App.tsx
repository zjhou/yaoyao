import { useState } from 'react'
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import reactLogo from './assets/react.svg'
import './App.css'

let x = 50;
const y = 50;

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
  p5.stroke(251, 192, 93, this.lifespan);
  p5.strokeWeight(2);
  p5.fill(251, 93, 99, this.lifespan);
  p5.ellipse(this.position.x, this.position.y, 12, 12);
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
    p5.createCanvas(720, 400);
    p5.textSize(32);
    p5.text('word', 10, 30);
    system = new ParticleSystem(p5.createVector(p5.width / 2, 50));
  };
  const draw = (p5: p5Types) => {
    p5.background(255);
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
