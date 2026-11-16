import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { Heart } from "lucide-react";

import "./styles/main.scss";

import {
  wedding,
  ANIMATION_TIMINGS,
} from "./data/wedding";

import Welcome from "./phases/Phase01_Welcome/Welcome";
import Envelope from "./phases/Phase02_Envelope/Envelope";

import Hero from "./phases/Phase03_MainInvitation/Hero";
import Countdown from "./phases/Phase03_MainInvitation/Countdown";
import SaveTheDate from "./phases/Phase03_MainInvitation/SaveTheDate";

import LoveStory from "./phases/Phase04_LoveStory/LoveStory";

import FloatingNavigation from "./components/FloatingNavigation";
import MusicPlayer from "./components/MusicPlayer";

import Gallery from "./phases/Phase05_Gallery/Gallery";
import WeddingDetails from "./phases/Phase06_WeddingDetails/WeddingDetails";
import Entourage from "./phases/Phase07_Entourage/Entourage";
import RSVP from "./phases/Phase08_RSVP/RSVP";
import GuestInformation from "./phases/Phase09_GuestInformation/GuestInformation";
import FinalPolish from "./phases/Phase10_FinalPolish/FinalPolish";
import ConfirmedGuests from "./phases/Phase08_RSVP/ConfirmedGuests";

export default function App() {
  const [screen, setScreen] = useState("welcome");

  const [envelopeStage, setEnvelopeStage] =
    useState("sealed");

  const [menuOpen, setMenuOpen] = useState(false);

  const reducedMotion = useReducedMotion();

  const timersRef = useRef([]);
  const openingRef = useRef(false);

  /* =====================================
     TIMER CLEANUP
  ===================================== */

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (callback, delay) => {
    const timer = setTimeout(callback, delay);
    timersRef.current.push(timer);
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  /* =====================================
     SCROLL LOCK
  ===================================== */

  useEffect(() => {
    const shouldLock =
      screen !== "invitation" || menuOpen;

    document.body.style.overflow =
      shouldLock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [screen, menuOpen]);

  /* =====================================
     RESET SCROLL ON INVITATION OPEN
  ===================================== */

  useEffect(() => {
    if (screen !== "invitation") return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [screen]);

  /* =====================================
     OPEN INVITATION
  ===================================== */

  const openInvitation = () => {
    if (openingRef.current) return;

    openingRef.current = true;

    clearTimers();

    if (reducedMotion) {
      setScreen("invitation");
      openingRef.current = false;
      return;
    }

    setEnvelopeStage("sealed");
    setScreen("envelope");

    schedule(() => {
      setEnvelopeStage("opening");
    }, ANIMATION_TIMINGS.flap);

    schedule(() => {
      setEnvelopeStage("letter");
    }, (
      ANIMATION_TIMINGS.flap +
      ANIMATION_TIMINGS.letter
    ));

    schedule(() => {
      setEnvelopeStage("revealing");
    }, (
      ANIMATION_TIMINGS.flap +
      ANIMATION_TIMINGS.letter +
      ANIMATION_TIMINGS.reveal
    ));

    schedule(() => {
      setScreen("invitation");
      openingRef.current = false;
    }, (
      ANIMATION_TIMINGS.flap +
      ANIMATION_TIMINGS.letter +
      ANIMATION_TIMINGS.reveal +
      ANIMATION_TIMINGS.finish
    ));
  };

  /* =====================================
     NAVIGATION
  ===================================== */

  const scrollToSection = (id) => {
    setMenuOpen(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });
  };

  /* =====================================
     PAGE TRANSITION
  ===================================== */

  const pageTransition = {
    duration: reducedMotion ? 0 : 0.65,
    ease: "easeInOut",
  };

  /* =====================================
     RENDER
  ===================================== */

  return (
    <main className="wedding-app">

      {/* AUDIO REMAINS MOUNTED */}

      <MusicPlayer
        active={screen === "invitation"}
      />

      <AnimatePresence mode="wait">

        {/* PHASE 1 — WELCOME */}

        {screen === "welcome" && (
          <Welcome
            key="welcome"
            openInvitation={openInvitation}
            reducedMotion={reducedMotion}
            pageTransition={pageTransition}
          />
        )}

        {/* PHASE 2 — ENVELOPE */}

        {screen === "envelope" && (
          <Envelope
            key="envelope"
            envelopeStage={envelopeStage}
            reducedMotion={reducedMotion}
            pageTransition={pageTransition}
          />
        )}

        {/* MAIN INVITATION */}

        {screen === "invitation" && (
          <motion.div
            key="invitation"
            className="main-invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 1,
            }}
          >

            {/* FLOATING NAVIGATION */}

            <FloatingNavigation
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              reducedMotion={reducedMotion}
            />

            {/* PHASE 3 — HERO */}

            <Hero
              reducedMotion={reducedMotion}
              scrollToSection={scrollToSection}
            />

            {/* PHASE 3 — COUNTDOWN */}

            <Countdown
              reducedMotion={reducedMotion}
            />

            {/* PHASE 3 — SAVE THE DATE */}

            <SaveTheDate />

            {/* PHASE 4 — OUR LOVE STORY */}

            <LoveStory
              reducedMotion={reducedMotion}
            />

            {/* PHASE 05 — GALLERY */}

            <Gallery
              reducedMotion={reducedMotion}
            />

            {/* PHASE 06 — WEDDING DETAILS */}

            <WeddingDetails
              reducedMotion={reducedMotion}
            />

            {/* PHASE 07 — ENTOURAGE */}
            <Entourage reducedMotion={reducedMotion} />

            {/* PHASE 08 — RSVP */}
            <RSVP reducedMotion={reducedMotion} />

            {/* PHASE 08 — CONFIRMED GUESTS */}
            <ConfirmedGuests reducedMotion={reducedMotion} /> 

            {/* PHASE 09 — GUEST INFORMATION */}
            <GuestInformation reducedMotion={reducedMotion} />

            {/* PHASE 10 — FINAL POLISH */}
            <FinalPolish reducedMotion={reducedMotion} />

            {/* FUTURE PHASES GO HERE */}

            {/* FOOTER */}

            <footer className="wedding-footer">
              <Heart
                size={18}
                fill="currentColor"
              />

              <p>
                {wedding.bride} &amp; {wedding.groom}
              </p>

              <span>
                OUR FOREVER BEGINS HERE
              </span>
            </footer>

          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}