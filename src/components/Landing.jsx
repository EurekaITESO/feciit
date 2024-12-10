import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const sphereVariantsLeft = {
  initial: { scale: 0.5, opacity: 0, x: -200, y: -200 },
  center: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 2, ease: "easeOut" },
  },
  separate: {
    scale: 1,
    opacity: 1,
    x: -250,
    y: -250,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const sphereVariantsRight = {
  initial: { scale: 0.5, opacity: 0, x: 200, y: 200 },
  center: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 2, ease: "easeOut" },
  },
  separate: {
    scale: 1,
    opacity: 1,
    x: 250,
    y: 250,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationState, setAnimationState] = useState("initial");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState("center");
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setAnimationState("separate");
      } else {
        setAnimationState("center");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden font-sans">
      <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-lg z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-extrabold text-black tracking-wide">
            FECIIT
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6 text-black font-medium">
            <li>
              <a
                href="#about"
                className="relative hover:text-brand-primary transition group"
              >
                Acerca de
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#categories"
                className="relative hover:text-brand-primary transition group"
              >
                Categorias
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#events"
                className="relative hover:text-brand-primary transition group"
              >
                Eventos
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="relative hover:text-brand-primary transition group"
              >
                Preguntas frecuentes
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black focus:outline-none transition-transform duration-200 transform hover:scale-105"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/30 backdrop-blur-lg shadow-lg border-t border-white/10">
            <ul className="flex flex-col space-y-4 px-6 py-4 text-black font-medium">
              <li>
                <a
                  href="#about"
                  className="block hover:text-brand-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  Acerca de
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="block hover:text-brand-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  Categorias
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="block hover:text-brand-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  Eventos
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="block hover:text-brand-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Left Sphere */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 blur-3xl opacity-60"
        variants={sphereVariantsLeft}
        initial="initial"
        animate={animationState}
        style={{ top: "10%", left: "10%" }}
      />

      {/* Right Sphere */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-cyan-100 via-cyan-200 to-cyan-300 blur-3xl opacity-60"
        variants={sphereVariantsRight}
        initial="initial"
        animate={animationState}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-6xl md:text-6xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          FECIIT 25
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-gray-700 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Feria Nacional de Ciencias del ITESO
        </motion.p>
      </div>
    </section>
  );
};

export default Landing;
