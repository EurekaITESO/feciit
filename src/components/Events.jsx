import React, { useState } from "react";
import { motion } from "framer-motion";

const eventsData = [
  {
    id: 1,
    title: "Physics Workshop",
    date: "2024-03-15",
    modality: "In-person",
    tags: ["Physics", "Workshop"],
    photo: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    id: 2,
    title: "Biology Seminar",
    date: "2024-03-18",
    modality: "Online",
    tags: ["Biology", "Seminar"],
    photo: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    id: 3,
    title: "Astronomy Keynote",
    date: "2024-03-20",
    modality: "In-person",
    tags: ["Astronomy", "Keynote"],
    photo: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    id: 4,
    title: "Ecology Panel Discussion",
    date: "2024-03-22",
    modality: "Online",
    tags: ["Ecology", "Panel"],
    photo: "https://via.placeholder.com/150",
    link: "#",
  },
];

const Events = () => {
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "Physics", "Biology", "Astronomy", "Ecology"];

  const filteredEvents =
    selectedTag === "All"
      ? eventsData
      : eventsData.filter((event) => event.tags.includes(selectedTag));

  return (
    <motion.section
      id="events"
      className="flex flex-col items-center justify-start bg-white text-black py-16 px-8 md:min-h-screen md:h-screen"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h2>

      {/* Filter Tags */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-full border-2 ${
              selectedTag === tag
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-blue-500"
            } hover:bg-blue-500 hover:text-white transition`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            className="flex flex-col bg-white border rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={event.photo}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Modality:</strong> {event.modality}
              </p>
              <a
                href={event.link}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition"
              >
                View Details
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Events;
