import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import GoldDivider from "../../components/GoldDivider";

import {
  wedding,
  loveStory,
} from "../../data/wedding";

/* =========================================
   LOVE STORY IMAGE
========================================= */

function StoryImage({ src, alt }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return (
      <div
        className="love-story-image-placeholder"
        role="img"
        aria-label={`${alt} — photo coming soon`}
      >
        <Heart
          size={35}
          strokeWidth={1}
          aria-hidden="true"
        />

        <span>OUR MEMORIES</span>
      </div>
    );
  }

  return (
    <img
      className="love-story-image"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setImageFailed(true)}
    />
  );
}

/* =========================================
   LOVE STORY CHAPTER
========================================= */

function StoryChapter({
  chapter,
  index,
  reducedMotion,
}) {
  const isReverse = index % 2 === 1;

  return (
    <div
      className={`love-story-chapter ${
        isReverse ? "is-reversed" : ""
      }`}
    >
      {/* TIMELINE MARKER */}

      <div
        className="love-story-marker"
        aria-hidden="true"
      >
        <Heart
          size={16}
          fill="currentColor"
          strokeWidth={1}
        />
      </div>

      {/* STORY CARD */}

      <motion.article
        className="love-story-card"
        initial={{
          opacity: reducedMotion ? 1 : 0,
          y: reducedMotion ? 0 : 45,
          x: reducedMotion
            ? 0
            : isReverse
              ? 30
              : -30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.85,
          ease: "easeOut",
        }}
      >
        {/* CHAPTER IMAGE */}

        <div className="love-story-image-frame">
          <StoryImage
            src={chapter.image}
            alt={chapter.imageAlt}
          />
        </div>

        {/* CHAPTER CONTENT */}

        <div className="love-story-card-content">
          <span className="love-story-chapter-label">
            {chapter.label}
          </span>

          <h3 className="love-story-card-title">
            {chapter.title}
          </h3>

          {chapter.date && (
            <p className="love-story-chapter-date">
              {chapter.date}
            </p>
          )}

          <div
            className="love-story-card-divider"
            aria-hidden="true"
          />

          <p className="love-story-card-description">
            {chapter.description}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

/* =========================================
   PHASE 4 — OUR LOVE STORY
========================================= */

export default function LoveStory({
  reducedMotion = false,
}) {
  return (
    <section
      id="love-story"
      className="love-story-section"
      aria-labelledby="love-story-title"
    >
      <div className="section-container">

        {/* SECTION HEADING */}

        <motion.div
          className="love-story-heading"
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
          }}
        >
          <p className="section-eyebrow">
            THE JOURNEY OF US
          </p>

          <h2
            id="love-story-title"
            className="section-title"
          >
            Our Love Story
          </h2>

          <p className="section-subtitle">
            Every love story is beautiful,
            <br />
            but ours is our favorite.
          </p>

          <GoldDivider />
        </motion.div>

        {/* TIMELINE */}

        <div className="love-story-timeline">
          {loveStory.map((chapter, index) => (
            <StoryChapter
              key={chapter.id}
              chapter={chapter}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ENDING MESSAGE */}

        <motion.div
          className="love-story-ending"
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
          }}
        >
          <div
            className="love-story-ending-heart"
            aria-hidden="true"
          >
            <Heart
              size={25}
              strokeWidth={1.2}
              fill="currentColor"
            />
          </div>

          <p className="love-story-ending-text">
            And so, our forever begins...
          </p>

          <p className="love-story-ending-couple">
            {wedding.bride}
            <span> &amp; </span>
            {wedding.groom}
          </p>
        </motion.div>

      </div>
    </section>
  );
}