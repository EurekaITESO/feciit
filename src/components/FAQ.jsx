import React, { useState } from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "Is there an entry fee?",
    answer: "No, attendance is free!",
  },
  {
    question: "How do I register my project?",
    answer: 'Use the "Register Today" button at the top of the page.',
  },
  {
    question: "What is the deadline for registration?",
    answer: "The deadline for registration is March 1, 2024.",
  },
  {
    question: "Can I attend without submitting a project?",
    answer: "Yes, you are welcome to attend and enjoy the event.",
  },
  {
    question: "Will there be food and drinks available?",
    answer: "Yes, refreshments will be provided throughout the event.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="flex-grow bg-gray-400 text-black px-8 py-8 overflow-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="w-full max-w-2xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full text-left py-4 px-2 text-lg font-medium flex justify-between items-center hover:bg-gray-100 transition"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>
              {openIndex === index && (
                <motion.div
                  className="px-2 pb-4 text-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white text-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              &copy; 2024 Science Fair. All Rights Reserved.
            </p>
            <p className="mt-2 text-sm">
              <a href="#events" className="text-blue-500 hover:underline">
                Events
              </a>{" "}
              |{" "}
              <a href="#faq" className="text-blue-500 hover:underline">
                FAQ
              </a>{" "}
              |{" "}
              <a href="#contact" className="text-blue-500 hover:underline">
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
