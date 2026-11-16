import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import {
  wedding,
  formattedDate,
} from "../../data/wedding";

export default function Envelope({
  envelopeStage,
  reducedMotion,
  pageTransition,
}) {
  return (
    <motion.section
      key="envelope"
      className={`envelope-screen stage-${envelopeStage}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: reducedMotion ? 1 : 1.08,
      }}
      transition={pageTransition}
      aria-label="Opening your wedding invitation"
    >
      <div className="envelope-background-glow"
        aria-hidden="true"
       />

      <motion.div
        className="envelope-heading"
        initial={{
          opacity: 0,
          y: reducedMotion ? 0 : 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.8,
        }}
      >
        <p className="eyebrow">
          A SPECIAL INVITATION
        </p>
        <h2>Made with Love</h2>
      </motion.div>

      <div className="envelope-scene" aria-hidden="true">
        <div className="envelope-shadow" />

        <div className="envelope-container">
          <div className="envelope-back" />

          <div className="envelope-letter">
            <div className="letter-inner">
              <Heart
                size={17}
                strokeWidth={1}
                className="letter-heart"
              />

              <span className="letter-small">
                THE WEDDING OF
              </span>

              <strong>
                {wedding.bride}
                <span>&amp;</span>
                {wedding.groom}
              </strong>

              <span className="letter-date">
                {formattedDate}
              </span>
            </div>
          </div>

          <div className="envelope-flap" />

          <div className="envelope-front">
            <div className="envelope-front-left" />
            <div className="envelope-front-right" />
            <div className="envelope-front-bottom" />
          </div>

          <div className="wax-seal">
            <span className="wax-seal-inner">
              <Heart
                size={19}
                strokeWidth={1.2}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="envelope-bottom-text">
        <span className="loading-line" />
        <p>UNFOLDING OUR FOREVER</p>
        <span className="loading-line" />
      </div>
    </motion.section>
  );
}