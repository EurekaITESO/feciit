import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative h-screen flex flex-col items-center justify-center bg-white snap-start p-8 overflow-hidden"
    >
      {/* Cyan Sphere */}
      <motion.div
        className="absolute bottom-[-10%] left-[-20%] w-96 h-96 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full opacity-50 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Content */}
      <div className="relative max-w-3xl text-center">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Una oportunidad unica de cambiar el mundo
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          Es un evento que consistira en ponencias, talleres, y el tradicional
          concurso de proyectos, dirigido a estudiantes de licenciatura de
          Mexico
        </motion.p>
      </div>
    </section>
  );
};

export default About;
