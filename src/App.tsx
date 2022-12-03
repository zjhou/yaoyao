import Sketch from "react-p5";
import type p5Types from "p5";
import { HeartSystem } from "./heart_system";
import { useEffect, useRef } from "react";

import './App.css'

function App() {
  let system: HeartSystem;

  const p5Ref = useRef<p5Types>();

  const setup = (p5: p5Types) => {
    p5Ref.current = p5;
    p5.createCanvas(innerWidth, innerHeight);
    system = new HeartSystem(p5.createVector((p5.width - 100) / 2, p5.height / 2 - 200), { p5 });
    system.display();
  };

  const draw = (p5: p5Types) => {
    p5.background(251, 192, 93);
    system.showTimer(system.position.x + 15, p5.height - 80);
    system.run();
  };

  const onWindowResized = () => {
    if (p5Ref.current) {
      const p5 = p5Ref.current;
      p5.resizeCanvas(window.innerWidth, window.innerHeight);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onWindowResized);
    const p5 = p5Ref.current;

    if (p5) {
      system.showHeartPair(system.position.x, p5.height - 90);
    }

    return () => window.removeEventListener("resize", onWindowResized);
  }, [])

  return (
    <Sketch setup={setup} draw={draw} />
  );
}

export default App
