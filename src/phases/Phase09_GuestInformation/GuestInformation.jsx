
import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Heart,
  Shirt,
  Gift,
  Clock3,
  CameraOff,
  Users,
  CalendarCheck,
  ChevronDown,
  Sparkles,
  Info,
} from "lucide-react";

import GoldDivider from "../../components/GoldDivider";

import {
  wedding,
  guestInformation,
} from "../../data/wedding";

/* =========================================
   SCROLL REVEAL
========================================= */

function Reveal({
  children,
  className = "",
  reducedMotion,
  delay = 0,
}) {
  return (
    <motion.div
      className={className}
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
        amount: 0.12,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   DRESS CODE
========================================= */

function DressCode({ reducedMotion }) {
  const data = guestInformation.dressCode;

  return (
    <Reveal
      className="guest-info-feature-card guest-info-dress-code"
      reducedMotion={reducedMotion}
    >
      <div className="guest-info-card-icon">
        <Shirt size={25} strokeWidth={1.3} />
      </div>

      <p className="guest-info-card-eyebrow">
        {data.eyebrow}
      </p>

      <h3>{data.title}</h3>

      <p className="guest-info-dress-heading">
        {data.heading}
      </p>

      <p className="guest-info-card-description">
        {data.description}
      </p>

      {/* COLOR PALETTE */}

      <div className="guest-info-palette">
        <p>OUR WEDDING COLORS</p>

        <div className="guest-info-color-list">
          {data.colors.map((color) => (
            <div
              key={color.id}
              className="guest-info-color"
            >
              <span
                className="guest-info-color-swatch"
                style={{
                  backgroundColor: color.hex,
                }}
                title={color.name}
              />

              <span className="guest-info-color-name">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ATTIRE GUIDE */}

      <div className="guest-info-attire-grid">
        <div>
          <span>FOR THE GENTLEMEN</span>
          <p>{data.gentlemen}</p>
        </div>

        <div>
          <span>FOR THE LADIES</span>
          <p>{data.ladies}</p>
        </div>
      </div>

      <div className="guest-info-dress-note">
        <Info size={17} strokeWidth={1.5} />
        <span>{data.note}</span>
      </div>
    </Reveal>
  );
}

/* =========================================
   GIFT GUIDE
========================================= */

function GiftGuide({ reducedMotion }) {
  const data = guestInformation.giftGuide;

  return (
    <Reveal
      className="guest-info-feature-card guest-info-gift-guide"
      reducedMotion={reducedMotion}
      delay={0.1}
    >
      <div className="guest-info-card-icon">
        <Gift size={25} strokeWidth={1.3} />
      </div>

      <p className="guest-info-card-eyebrow">
        {data.eyebrow}
      </p>

      <h3>{data.title}</h3>

      <div className="guest-info-gift-decoration">
        <span />
        <Heart
          size={18}
          fill="currentColor"
          strokeWidth={1}
        />
        <span />
      </div>

      <p className="guest-info-gift-message">
        {data.description}
      </p>

      <Sparkles
        className="guest-info-gift-sparkle"
        size={28}
        strokeWidth={1}
        aria-hidden="true"
      />

      <p className="guest-info-gift-closing">
        {data.closing}
      </p>
    </Reveal>
  );
}

/* =========================================
   REMINDER ICON
========================================= */

const reminderIcons = {
  clock: Clock3,
  camera: CameraOff,
  users: Users,
  heart: CalendarCheck,
};

/* =========================================
   WEDDING REMINDERS
========================================= */

function WeddingReminders({ reducedMotion }) {
  return (
    <div className="guest-info-reminders-section">
      <Reveal
        className="guest-info-subheading"
        reducedMotion={reducedMotion}
      >
        <Heart size={23} strokeWidth={1.2} />

        <span>A FEW GENTLE REMINDERS</span>

        <h3>Wedding Reminders</h3>

        <p>
          Little details to help make our celebration
          wonderful for everyone.
        </p>
      </Reveal>

      <div className="guest-info-reminders-grid">
        {guestInformation.reminders.map(
          (reminder, index) => {
            const Icon =
              reminderIcons[reminder.icon] || Heart;

            return (
              <Reveal
                key={reminder.id}
                className="guest-info-reminder-card"
                reducedMotion={reducedMotion}
                delay={(index % 2) * 0.1}
              >
                <div className="guest-info-reminder-icon">
                  <Icon
                    size={25}
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>

                <h4>{reminder.title}</h4>

                <p>{reminder.description}</p>
              </Reveal>
            );
          }
        )}
      </div>
    </div>
  );
}

/* =========================================
   FAQ ACCORDION
========================================= */

function GuestFAQ({ reducedMotion }) {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((current) =>
      current === id ? null : id
    );
  };

  return (
    <div className="guest-info-faq-section">
      <Reveal
        className="guest-info-subheading"
        reducedMotion={reducedMotion}
      >
        <Heart size={23} strokeWidth={1.2} />

        <span>GOOD TO KNOW</span>

        <h3>Frequently Asked Questions</h3>

        <p>
          Everything you might want to know
          before our special day.
        </p>
      </Reveal>

      <div className="guest-info-faq-list">
        {guestInformation.faqs.map((faq, index) => {
          const isOpen = openId === faq.id;

          return (
            <Reveal
              key={faq.id}
              className={`guest-info-faq-item ${
                isOpen ? "is-open" : ""
              }`}
              reducedMotion={reducedMotion}
              delay={(index % 3) * 0.06}
            >
              <button
                type="button"
                className="guest-info-faq-question"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`${faq.id}-answer`}
              >
                <span>{faq.question}</span>

                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${faq.id}-answer`}
                    className="guest-info-faq-answer"
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.3,
                    }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================
   PHASE 09 — GUEST INFORMATION
========================================= */

export default function GuestInformation({
  reducedMotion = false,
}) {
  return (
    <section
      id="guest-information"
      className="guest-info-section"
      aria-labelledby="guest-info-title"
    >
      <div className="guest-info-container">
        {/* MAIN HEADING */}

        <Reveal
          className="guest-info-heading"
          reducedMotion={reducedMotion}
        >
          <p className="guest-info-eyebrow">
            A NOTE TO OUR BELOVED GUESTS
          </p>

          <h2 id="guest-info-title">
            Guest Information
          </h2>

          <p className="guest-info-subtitle">
            A few thoughtful details to help you
            prepare for our special day.
          </p>

          <GoldDivider />
        </Reveal>

        {/* DRESS CODE & GIFT GUIDE */}

        <div className="guest-info-features">
          <DressCode reducedMotion={reducedMotion} />

          <GiftGuide reducedMotion={reducedMotion} />
        </div>

        {/* WEDDING REMINDERS */}

        <WeddingReminders
          reducedMotion={reducedMotion}
        />

        {/* FAQ */}

        <GuestFAQ reducedMotion={reducedMotion} />

        {/* ENDING */}

        <Reveal
          className="guest-info-ending"
          reducedMotion={reducedMotion}
        >
          <Heart
            size={23}
            strokeWidth={1.2}
            aria-hidden="true"
          />

          <p>
            Thank you for being part of our
            beautiful journey.
          </p>

          <span>
            With love, {wedding.bride} &amp; {wedding.groom}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
