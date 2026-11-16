
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Church,
  PartyPopper,
  MapPin,
  Clock3,
  CalendarDays,
  Navigation,
  Heart,
} from "lucide-react";

import GoldDivider from "../../components/GoldDivider";

import {
  wedding,
  weddingDate,
  weddingDetails,
} from "../../data/wedding";

/* =========================================
   DATE FORMATTER
========================================= */

const formatEventDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return date.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/* =========================================
   VENUE ICON
========================================= */

function VenueIcon({ type }) {
  if (type === "ceremony") {
    return <Church size={23} strokeWidth={1.3} />;
  }

  return <PartyPopper size={23} strokeWidth={1.3} />;
}

/* =========================================
   VENUE CARD
========================================= */

function VenueCard({
  venue,
  index,
  reducedMotion,
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const hasImage = Boolean(venue.image) && !imageFailed;
  const hasMap = Boolean(venue.mapUrl?.trim());

  const venueName = venue.name?.trim() || "Venue to be announced";
  const venueAddress = venue.address?.trim() || "Location details coming soon";
  const venueTime = venue.time?.trim() || "Time to be announced";

  return (
    <motion.article
      className={`wedding-venue-card wedding-venue-card--${venue.type}`}
      initial={{
        opacity: reducedMotion ? 1 : 0,
        y: reducedMotion ? 0 : 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.8,
        delay: reducedMotion ? 0 : index * 0.15,
        ease: "easeOut",
      }}
    >
      {/* VENUE IMAGE */}

      <div className="wedding-venue-image">
        {hasImage ? (
          <img
            src={venue.image}
            alt={`${venue.title} venue`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="wedding-venue-placeholder">
            <VenueIcon type={venue.type} />

            <span>
              {venue.type === "ceremony"
                ? "THE SACRED UNION"
                : "THE CELEBRATION"}
            </span>
          </div>
        )}

        <div className="wedding-venue-image-overlay" />

        <div className="wedding-venue-image-label">
          <VenueIcon type={venue.type} />
          <span>{venue.label}</span>
        </div>
      </div>

      {/* VENUE INFORMATION */}

      <div className="wedding-venue-body">
        <p className="wedding-venue-number">
          {String(index + 1).padStart(2, "0")}
          <span className="wedding-venue-number-line" />
          THE WEDDING DAY
        </p>

        <h3 className="wedding-venue-title">
          {venue.title}
        </h3>

        <p className="wedding-venue-description">
          {venue.description}
        </p>

        <div className="wedding-venue-divider">
          <span />
          <Heart
            size={13}
            fill="currentColor"
            strokeWidth={1}
            aria-hidden="true"
          />
          <span />
        </div>

        {/* DATE */}

        <div className="wedding-venue-detail">
          <div className="wedding-venue-detail-icon">
            <CalendarDays size={19} strokeWidth={1.5} />
          </div>

          <div className="wedding-venue-detail-text">
            <span>DATE</span>
            <strong>{formatEventDate(weddingDate)}</strong>
          </div>
        </div>

        {/* TIME */}

        <div className="wedding-venue-detail">
          <div className="wedding-venue-detail-icon">
            <Clock3 size={19} strokeWidth={1.5} />
          </div>

          <div className="wedding-venue-detail-text">
            <span>TIME</span>
            <strong>{venueTime}</strong>
          </div>
        </div>

        {/* LOCATION */}

        <div className="wedding-venue-detail">
          <div className="wedding-venue-detail-icon">
            <MapPin size={19} strokeWidth={1.5} />
          </div>

          <div className="wedding-venue-detail-text">
            <span>VENUE</span>
            <strong>{venueName}</strong>

            <p>{venueAddress}</p>
          </div>
        </div>

        {/* GOOGLE MAPS */}

        {hasMap ? (
          <a
            className="wedding-venue-map-button"
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${venueName}`}
          >
            <Navigation size={17} strokeWidth={1.6} />
            <span>GET DIRECTIONS</span>
          </a>
        ) : (
          <div
            className="wedding-venue-map-button wedding-venue-map-button--disabled"
            aria-label="Directions will be available soon"
          >
            <MapPin size={17} strokeWidth={1.6} />
            <span>DIRECTIONS COMING SOON</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* =========================================
   PHASE 06 — WEDDING DETAILS
========================================= */

export default function WeddingDetails({
  reducedMotion = false,
}) {
  return (
    <section
      id="wedding-details"
      className="wedding-details-section"
      aria-labelledby="wedding-details-title"
    >
      {/* BACKGROUND DECORATIONS */}

      <div
        className="wedding-details-decoration wedding-details-decoration--left"
        aria-hidden="true"
      />

      <div
        className="wedding-details-decoration wedding-details-decoration--right"
        aria-hidden="true"
      />

      <div className="wedding-details-container">
        {/* HEADING */}

        <motion.div
          className="wedding-details-heading"
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
          <p className="wedding-details-eyebrow">
            THE CELEBRATION
          </p>

          <h2
            id="wedding-details-title"
            className="wedding-details-title"
          >
            Wedding Details
          </h2>

          <p className="wedding-details-subtitle">
            Two hearts, one beautiful beginning.
            <br />
            We can't wait to celebrate with you.
          </p>

          <GoldDivider />
        </motion.div>

        {/* INTRODUCTION */}

        <motion.div
          className="wedding-details-intro"
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 20,
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
          }}
        >
          <span className="wedding-details-intro-line" />

          <p>
            Together with our families, we joyfully invite you
            to witness our union and share in the celebration
            of our love.
          </p>

          <span className="wedding-details-intro-line" />
        </motion.div>

        {/* CEREMONY & RECEPTION */}

        <div className="wedding-details-grid">
          {weddingDetails.map((venue, index) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ENDING */}

        <motion.div
          className="wedding-details-ending"
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 20,
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
          <Heart
            size={23}
            strokeWidth={1.2}
            aria-hidden="true"
          />

          <p>
            Your presence will make our special day
            even more meaningful.
          </p>

          <span>
            {wedding.bride} &amp; {wedding.groom}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
