import React, { useEffect, useRef, useState } from "react";
import p2 from "p2";
import { motion, AnimatePresence } from "framer-motion";

const disciplines = [
  "Physics",
  "Biology",
  "Chemistry",
  "Mathematics",
  "Geology",
  "Astronomy",
  "Computer Science",
  "Ecology",
  "Neuroscience",
  "Engineering",
];

export default function Categories() {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [sphereSize, setSphereSize] = useState(150); // Default radius
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const worldRef = useRef(null);
  const bodiesRef = useRef([]);
  const animationRef = useRef(null);
  const dragInfo = useRef({ body: null, offset: [0, 0] }); // Track dragging info

  const calculateSphereSize = () => {
    const container = containerRef.current;
    if (!container) return 150;

    const size = Math.min(container.clientWidth, container.clientHeight) * 0.1;
    return Math.max(50, Math.min(size, 150)); // Clamp between 50px and 150px
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSphereSize = () => {
      const newSize = calculateSphereSize();
      setSphereSize(newSize);
    };

    updateSphereSize();
    window.addEventListener("resize", updateSphereSize);
    return () => {
      window.removeEventListener("resize", updateSphereSize);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const sphereRadius = sphereSize;
    const sphereDiameter = sphereRadius * 2;

    const world = new p2.World({
      gravity: [0, 9.82],
    });

    world.defaultContactMaterial.restitution = 0.3;
    world.defaultContactMaterial.friction = 0.5;

    const groundShape = new p2.Plane();
    const groundBody = new p2.Body({
      position: [0, height],
      angle: Math.PI,
    });
    groundBody.addShape(groundShape);
    world.addBody(groundBody);

    const leftShape = new p2.Plane();
    const leftWall = new p2.Body({
      position: [0, 0],
      angle: -Math.PI / 2,
    });
    leftWall.addShape(leftShape);
    world.addBody(leftWall);

    const rightShape = new p2.Plane();
    const rightWall = new p2.Body({
      position: [width, 0],
      angle: Math.PI / 2,
    });
    rightWall.addShape(rightShape);
    world.addBody(rightWall);

    const topShape = new p2.Plane();
    const topWall = new p2.Body({
      position: [0, 0],
      angle: 0,
    });
    topWall.addShape(topShape);
    world.addBody(topWall);

    const initialBodies = disciplines.map((disc, i) => {
      const xPos = Math.random() * (width - sphereDiameter) + sphereRadius;
      const yPos = Math.random() * (height / 2);

      const circleShape = new p2.Circle({ radius: sphereRadius });
      const circleBody = new p2.Body({
        mass: 1,
        position: [xPos, yPos],
        damping: 0.5,
        angularDamping: 0.5,
      });
      circleBody.addShape(circleShape);
      world.addBody(circleBody);
      return circleBody;
    });

    worldRef.current = world;
    bodiesRef.current = initialBodies;

    setPositions(
      initialBodies.map((b) => ({
        x: b.position[0],
        y: b.position[1],
      })),
    );

    const animate = () => {
      world.step(1 / 60);
      const newPositions = bodiesRef.current.map((b) => ({
        x: b.position[0],
        y: b.position[1],
      }));
      setPositions(newPositions);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleMouseDown = (event) => {
      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      for (let body of bodiesRef.current) {
        const distance = Math.sqrt(
          (body.position[0] - mouseX) ** 2 + (body.position[1] - mouseY) ** 2,
        );
        if (distance <= sphereRadius) {
          dragInfo.current.body = body;
          dragInfo.current.offset = [
            mouseX - body.position[0],
            mouseY - body.position[1],
          ];
          break;
        }
      }
    };

    const handleMouseMove = (event) => {
      if (!dragInfo.current.body) return;

      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      dragInfo.current.body.position = [
        mouseX - dragInfo.current.offset[0],
        mouseY - dragInfo.current.offset[1],
      ];
    };

    const handleMouseUp = () => {
      dragInfo.current.body = null;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
    };
  }, [sphereSize]);

  const openModal = (discipline) => {
    setModalContent(discipline);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <section
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        {positions.map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: sphereSize * 2,
              height: sphereSize * 2,
              borderRadius: "50%",
              backgroundColor: "black",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              left: pos.x - sphereSize,
              top: pos.y - sphereSize,
              userSelect: "none",
              cursor: "grab",
              transition: "background-color 0.3s, transform 0.1s",
            }}
            onClick={() => openModal(disciplines[i])}
          >
            {disciplines[i]}
          </div>
        ))}
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "blue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              zIndex: 1000,
            }}
            onClick={closeModal}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "2rem",
                padding: "20px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{modalContent}</h2>
              <p>Details about {modalContent} go here.</p>
              <button
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "white",
                  color: "blue",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
