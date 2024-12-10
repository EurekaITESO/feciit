import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.section
      className="h-screen flex flex-col items-center justify-center bg-black text-white snap-start p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Involved</h2>
        <p className="text-lg md:text-xl mb-6">
          Register now to present your project or attend as a visitor. Don't
          miss out on this unique opportunity to engage with brilliant minds.
        </p>
        <a
          href="#"
          className="bg-white text-purple-600 px-6 py-3 rounded font-bold shadow-md hover:opacity-90 transition inline-block"
        >
          Register Today
        </a>
      </div>
    </motion.section>
  );
};

export default CallToAction;
