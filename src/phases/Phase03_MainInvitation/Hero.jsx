import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import GoldDivider from "../../components/GoldDivider";

import {
  wedding,
  formattedDate,
} from "../../data/wedding";

export default function Hero({
  reducedMotion,
  scrollToSection,
}) {
  const [
    heroImageAvailable,
    setHeroImageAvailable,
  ] = useState(true);

  return (
    <section
      id="home"
      className={`main-hero ${
        heroImageAvailable
          ? "has-hero-image"
          : "no-hero-image"
      }`}
      style={
        heroImageAvailable
          ? {
              "--hero-image": `url("${wedding.heroImage}")`,
            }
          : undefined
      }
    >
      {heroImageAvailable && (
        <img
          className="hero-image-loader"
          src={wedding.heroImage}
          alt=""
          aria-hidden="true"
          onError={() =>
            setHeroImageAvailable(false)
          }
        />
      )}

      <div className="hero-overlay" />

      <motion.div
        className="main-hero-content"
        initial={{
          opacity: 0,
          y: reducedMotion ? 0 : 35,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 1.2,
          delay: reducedMotion ? 0 : 0.2,
        }}
      >
        <p className="hero-top-text">
          TOGETHER WITH OUR FAMILIES
        </p>

        <p className="hero-invitation-text">
          We request the honor of your presence
          <br />
          as we celebrate our wedding.
        </p>

        <div className="hero-heart">
          <GoldDivider />
        </div>

        <p className="hero-small-label">
          THE WEDDING OF
        </p>

        <h1 className="hero-names">
          <span>{wedding.bride}</span>
          <em>&amp;</em>
          <span>{wedding.groom}</span>
        </h1>

        <div className="hero-gold-line" />

        <p className="hero-romantic-message">
          In honor and gratitude to God
          <br />
          who brought us together
        </p>

        <p className="hero-wedding-date">
          {formattedDate}
        </p>

        <p className="hero-location">
          {wedding.location}
        </p>

        <button
          type="button"
          className="hero-scroll-button"
          onClick={() =>
            scrollToSection("countdown")
          }
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={18} />
        </button>
      </motion.div>
    </section>
  );
}