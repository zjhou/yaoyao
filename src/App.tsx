import Sketch from "react-p5";
import type p5Types from "p5";
import { timer } from './utils/timer'
import {useEffect, useRef} from "react";
import { ParticleSystem } from "./PS/ParticleSystem";

import './App.css'


function App() {
  let system: ParticleSystem;
  const p5Ref = useRef<p5Types>();
  const setup = (p5: p5Types) => {
    p5Ref.current = p5;
    p5.createCanvas(innerWidth, innerHeight);
    system = new ParticleSystem(p5.createVector(p5.width / 2, p5.height / 2 - 20), p5);
  };
  const draw = (p5: p5Types) => {
    p5.background(251, 192, 93);
    system.addParticle();
    system.run();
    system.showTimer(system.origin.x - 65, system.origin.y + 60)
  };
  const onWindowResized = () => {
    if (p5Ref.current) {
      const p5 = p5Ref.current;
      p5.resizeCanvas(window.innerWidth, window.innerHeight);
      system.reposition(p5.createVector(p5.width / 2, p5.height / 2 - 20))
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onWindowResized);
    const p5 = p5Ref.current;

    if (p5) {
      system.addParticle(p5.createVector(system.origin.x - 12, system.origin.y - 20), true);
      system.addParticle(p5.createVector(system.origin.x, system.origin.y - 20), true);
    }

    return () => window.removeEventListener("resize", onWindowResized);
  }, [])
  return (
    <>
      <Sketch setup={setup} draw={draw} />
      <div className="coming">COMING SOON...</div>
    </>
  );
}

export default App
