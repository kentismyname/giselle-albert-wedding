
import { motion } from "framer-motion";
import {
  Heart,
  ArrowUp,
  Sparkles,
} from "lucide-react";

import GoldDivider from "../../components/GoldDivider";
import { wedding } from "../../data/wedding";

/* =========================================
   PHASE 10 — FINAL POLISH
========================================= */

export default function FinalPolish({
  reducedMotion = false,
}) {
  const scrollToTop = () => {
    const homeSection = document.getElementById("home");

    if (homeSection) {
      homeSection.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }
  };

  return (
    <footer
      id="final-polish"
      className="final-polish-section"
      aria-label="Wedding invitation closing message"
    >
      {/* BACKGROUND DECORATIONS */}

      <div
        className="final-polish-glow"
        aria-hidden="true"
      />

      <div
        className="final-polish-frame"
        aria-hidden="true"
      />

      <div className="final-polish-container">
        {/* TOP DECORATION */}

        <motion.div
          className="final-polish-ornament"
          initial={{
            opacity: reducedMotion ? 1 : 0,
            scale: reducedMotion ? 1 : 0.85,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
          }}
        >
          <Sparkles
            size={29}
            strokeWidth={1}
            aria-hidden="true"
          />
        </motion.div>

        {/* HEADING */}

        <motion.div
          className="final-polish-heading"
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
            amount: 0.2,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
          }}
        >
          <p className="final-polish-eyebrow">
            WITH ALL OUR LOVE
          </p>

          <h2>
            Thank You
          </h2>

          <p className="final-polish-message">
            Thank you for being part of our story,
            for sharing in our happiness,
            and for celebrating the beginning
            of our forever.
          </p>

          <GoldDivider />
        </motion.div>

        {/* COUPLE NAMES */}

        <motion.div
          className="final-polish-couple"
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
            amount: 0.2,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.9,
            delay: reducedMotion ? 0 : 0.15,
          }}
        >
          <span className="final-polish-name">
            {wedding.bride}
          </span>

          <span className="final-polish-ampersand">
            &amp;
          </span>

          <span className="final-polish-name">
            {wedding.groom}
          </span>
        </motion.div>

        {/* CLOSING QUOTE */}

        <motion.div
          className="final-polish-quote"
          initial={{
            opacity: reducedMotion ? 1 : 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: reducedMotion ? 0 : 0.25,
          }}
        >
          <Heart
            size={20}
            strokeWidth={1.2}
            aria-hidden="true"
          />

          <p>
            And so, our forever begins.
          </p>
        </motion.div>

        {/* BACK TO TOP */}

        <motion.button
          type="button"
          className="final-polish-back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top of invitation"
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 15,
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
            duration: reducedMotion ? 0 : 0.7,
            delay: reducedMotion ? 0 : 0.3,
          }}
          whileHover={
            reducedMotion
              ? undefined
              : { y: -4 }
          }
        >
          <ArrowUp
            size={18}
            strokeWidth={1.5}
          />

          <span>BACK TO TOP</span>
        </motion.button>

        {/* COPYRIGHT */}

        <div className="final-polish-footer">
          <div className="final-polish-footer-line" />

          <p>
            MADE WITH LOVE
          </p>

          <span>
            {wedding.bride} &amp; {wedding.groom}
          </span>
        </div>
      </div>
    </footer>
  );
}
