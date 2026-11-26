
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Music2,
  Volume2,
  VolumeX,
  Heart,
  Maximize2
} from "lucide-react";

const memories = [
  {
    title: "Our First Memory",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200",
    description: "A beautiful moment to remember forever."
  },
  {
    title: "Beautiful Moments",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200",
    description: "Every little moment means something."
  },
  {
    title: "Special Memories",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200",
    description: "Some memories never fade."
  },
  {
    title: "Forever Special",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200",
    description: "A collection of unforgettable moments."
  },
  {
    title: "Our Little World",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200",
    description: "Welcome to our little museum."
  }
];

export default function FinalScreen() {
  const [selected, setSelected] = useState(null);
  const [musicOn, setMusicOn] = useState(false);
  const [current, setCurrent] = useState(0);
  const audioRef = useRef(null);

  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (musicOn) {
        audioRef.current.pause();
        setMusicOn(false);
      } else {
        await audioRef.current.play();
        setMusicOn(true);
      }
    } catch (error) {
      console.log("Music could not play:", error);
    }
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % memories.length);
  };

  const previous = () => {
    setCurrent((prev) =>
      (prev - 1 + memories.length) % memories.length
    );
  };

  return (
    <div className="museum">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Background */}
      <div className="museum-background" />

      {/* Header */}
      <header className="museum-header">
        <div className="museum-logo">
          <Heart size={19} />
          <span>OUR MUSEUM</span>
        </div>

        <button
          className="music-button"
          onClick={playMusic}
          aria-label="Toggle music"
        >
          {musicOn ? <Volume2 /> : <VolumeX />}
          <span>{musicOn ? "Music On" : "Music Off"}</span>
        </button>
      </header>

      {/* Introduction */}
      <section className="museum-intro">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="museum-eyebrow">
            A PLACE FULL OF MEMORIES
          </span>

          <h1>
            Welcome to
            <br />
            <span>Our Little Museum</span>
          </h1>

          <p>
            Every picture has a story.
            Every memory has a meaning.
            Take a little journey through our memories.
          </p>
        </motion.div>
      </section>

      {/* Gallery Room */}
      <section className="gallery-section">
        <div className="gallery-heading">
          <span>THE MEMORY COLLECTION</span>
          <h2>Our Beautiful Memories</h2>
        </div>

        <div className="museum-room">
          <div className="room-wall">
            {memories.map((memory, index) => (
              <motion.button
                key={memory.title}
                className={`memory-frame ${
                  current === index ? "active-frame" : ""
                }`}
                onClick={() => {
                  setCurrent(index);
                  setSelected(memory);
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="frame-inner">
                  <img
                    src={memory.image}
                    alt={memory.title}
                  />
                </div>

                <span className="frame-title">
                  {memory.title}
                </span>

                <span className="frame-number">
                  0{index + 1}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="room-floor" />
        </div>

        {/* Selected Memory */}
        <div className="featured-memory">
          <div className="featured-image">
            <img
              src={memories[current].image}
              alt={memories[current].title}
            />

            <button
              className="expand-button"
              onClick={() => setSelected(memories[current])}
            >
              <Maximize2 size={18} />
            </button>
          </div>

          <div className="featured-details">
            <span>FEATURED MEMORY · 0{current + 1}</span>

            <h3>{memories[current].title}</h3>

            <p>{memories[current].description}</p>

            <div className="gallery-controls">
              <button onClick={previous} aria-label="Previous">
                <ChevronLeft />
              </button>

              <span>
                {current + 1} / {memories.length}
              </span>

              <button onClick={next} aria-label="Next">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dedication */}
      <section className="dedication">
        <Heart size={28} />
        <h2>Made with Love</h2>
        <p>
          Some places are special because of the memories
          they hold. This little museum is one of them.
        </p>
        <span>FOREVER IN OUR MEMORIES</span>
      </section>

      {/* Image Viewer */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="image-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="viewer-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X />
            </button>

            <motion.div
              className="viewer-content"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selected.image}
                alt={selected.title}
              />

              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="museum-footer">
        <Music2 size={15} />
        <span>A little museum of beautiful memories</span>
        <Heart size={14} />
      </footer>
    </div>
  );
}
