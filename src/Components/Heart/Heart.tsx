import Sketch from "react-p5";
import type p5Types from "p5";
import { HeartSystem } from "./heart_system";
import {useRef} from "react";

import './Heart.css'

function Heart() {
  let system: HeartSystem;

  const p5Ref = useRef<p5Types>();

  const setup = (p5: p5Types) => {
    p5Ref.current = p5;
    p5.createCanvas(innerWidth, innerHeight);
    system = new HeartSystem(p5.createVector((p5.width - 100) / 2, p5.height / 2 - 200), { p5 });
    system.display();
    system.showHeartPair(system.position.x, p5.height - 88);
  };

  const draw = (p5: p5Types) => {
    p5.background(251, 192, 93);
    if (!system) {
      return;
    }
    system.showTimer(system.position.x + 15, p5.height - 80);
    system.run();
  };

  return (
    <Sketch setup={setup} draw={draw} />
  );
}

export default Heart
