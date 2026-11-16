import { motion } from "framer-motion";
import { Heart, MailOpen } from "lucide-react";

import {
  wedding,
  formattedDate,
} from "../../data/wedding";

export default function Welcome({
  openInvitation,
  reducedMotion,
  pageTransition,
}) {
  return (
    <motion.section
      key="welcome"
      className="welcome-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: reducedMotion ? 1 : 1.04,
      }}
      transition={pageTransition}
    >
      <div
        className="welcome-glow"
        aria-hidden="true"
      />

      <motion.div
        className="welcome-content"
        initial={{
          opacity: 0,
          y: reducedMotion ? 0 : 25,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 1,
        }}
      >
        <div
          className="ornament"
          aria-hidden="true"
        >
          <span />
          <Heart size={13} strokeWidth={1.4} />
          <span />
        </div>

        <p className="eyebrow">
          THE WEDDING OF
        </p>

        <h1 className="couple-names">
          <span>{wedding.bride}</span>
          <span className="ampersand">
            &amp;
          </span>
          <span>{wedding.groom}</span>
        </h1>

        <div className="gold-divider" aria-hidden="true" />

        <p className="welcome-message">
          Together with our families,
          <br />
          we joyfully invite you to celebrate
          <br />
          the beginning of our forever.
        </p>

        <div className="wedding-date">
          <span className="date-line" />
          <span>{formattedDate}</span>
          <span className="date-line" />
        </div>

        <p className="wedding-location">
          {wedding.location}
        </p>

        <motion.button
          type="button"
          className="open-button"
          onClick={openInvitation}
          whileHover={
            reducedMotion
              ? {}
              : { scale: 1.04 }
          }
          whileTap={{ scale: 0.97 }}
        >
          <MailOpen
            size={18}
            strokeWidth={1.5}
          />
          <span>OPEN INVITATION</span>
        </motion.button>

        <p className="button-hint">
          A special moment awaits
        </p>
      </motion.div>

      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />
    </motion.section>
  );
}