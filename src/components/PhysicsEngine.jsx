// src/components/PhysicsEngine.jsx

import React, { useEffect, useRef, createContext } from "react";
import Matter from "matter-js";

// Create a Context to provide the Matter.js engine
export const PhysicsContext = createContext();

const PhysicsEngine = ({ children }) => {
  const engine = useRef(Matter.Engine.create());
  const runner = useRef(Matter.Runner.create());

  useEffect(() => {
    const currentEngine = engine.current;
    const currentRunner = runner.current;
    const world = currentEngine.world;

    // Set gravity
    world.gravity.y = 1; // Adjust as needed

    // Create boundaries (walls) to contain the spheres
    const boundaries = [
      // Top
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        -25,
        window.innerWidth,
        50,
        { isStatic: true },
      ),
      // Bottom
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 25,
        window.innerWidth,
        50,
        { isStatic: true },
      ),
      // Left
      Matter.Bodies.rectangle(
        -25,
        window.innerHeight / 2,
        50,
        window.innerHeight,
        { isStatic: true },
      ),
      // Right
      Matter.Bodies.rectangle(
        window.innerWidth + 25,
        window.innerHeight / 2,
        50,
        window.innerHeight,
        { isStatic: true },
      ),
    ];

    Matter.World.add(world, boundaries);

    // Add mouse control (optional)
    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(currentEngine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.World.add(world, mouseConstraint);

    // Run the engine
    Matter.Runner.run(currentRunner, currentEngine);

    // Cleanup on unmount
    return () => {
      Matter.World.clear(world);
      Matter.Engine.clear(currentEngine);
      Matter.Runner.stop(currentRunner);
    };
  }, []);

  return (
    <PhysicsContext.Provider value={engine.current}>
      {children}
    </PhysicsContext.Provider>
  );
};

export default PhysicsEngine;
