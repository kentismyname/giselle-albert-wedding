import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  CheckCircle2,
  UserRoundCheck,
  Search,
} from "lucide-react";

import GoldDivider from "../../components/GoldDivider";
import { mockConfirmedGuests } from "../../data/wedding";

/* =========================================
   STORAGE CONFIGURATION
========================================= */

const STORAGE_KEY = "giselle-albert-rsvp-demo";
const RSVP_EVENT = "wedding-rsvp-updated";

/* =========================================
   VALIDATE LOCAL RSVP RECORD
========================================= */

const normalizeGuest = (guest) => {
  if (!guest || typeof guest !== "object") {
    return null;
  }

  if (guest.attendance !== "accept") {
    return null;
  }

  const fullName =
    typeof guest.fullName === "string"
      ? guest.fullName.trim()
      : "";

  const guestCount = Number(guest.guestCount);

  if (!fullName) {
    return null;
  }

  if (
    !Number.isInteger(guestCount) ||
    guestCount < 1 ||
    guestCount > 5
  ) {
    return null;
  }

  return {
    id: String(guest.id || fullName),
    fullName,
    guestCount,
  };
};

/* =========================================
   READ LOCAL RSVP DATA
========================================= */

const readLocalRSVPs = () => {
  try {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(stored)) {
      return [];
    }

    return stored
      .map(normalizeGuest)
      .filter(Boolean);
  } catch (error) {
    console.error("Unable to read RSVP data:", error);
    return [];
  }
};

/* =========================================
   CONFIRMED GUESTS
========================================= */

export default function ConfirmedGuests({
  reducedMotion = false,
}) {
  const [localGuests, setLocalGuests] = useState(
    readLocalRSVPs
  );

  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  /* =====================================
     SYNC LOCAL RSVP DATA
  ===================================== */

  useEffect(() => {
    const refreshGuests = () => {
      setLocalGuests(readLocalRSVPs());
    };

    window.addEventListener(
      RSVP_EVENT,
      refreshGuests
    );

    window.addEventListener(
      "storage",
      refreshGuests
    );

    return () => {
      window.removeEventListener(
        RSVP_EVENT,
        refreshGuests
      );

      window.removeEventListener(
        "storage",
        refreshGuests
      );
    };
  }, []);

  /* =====================================
     COMBINE GUESTS
  ===================================== */

  const confirmedGuests = useMemo(() => {
    const mockGuests = mockConfirmedGuests
      .map(normalizeGuest)
      .filter(Boolean);

    return [...mockGuests, ...localGuests];
  }, [localGuests]);

  /* =====================================
     STATISTICS
  ===================================== */

  const totalRSVPs = confirmedGuests.length;

  const totalAttendees = confirmedGuests.reduce(
    (total, guest) => total + guest.guestCount,
    0
  );

  /* =====================================
     SEARCH
  ===================================== */

  const filteredGuests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return confirmedGuests;
    }

    return confirmedGuests.filter((guest) =>
      guest.fullName.toLowerCase().includes(query)
    );
  }, [confirmedGuests, search]);

  const visibleGuests =
    showAll || search.trim()
      ? filteredGuests
      : filteredGuests.slice(0, 8);

  /* =====================================
     RENDER
  ===================================== */

  return (
    <section
      id="confirmed-guests"
      className="confirmed-guests-section"
      aria-labelledby="confirmed-guests-title"
    >
      <div className="confirmed-guests-container">
        {/* HEADING */}

        <motion.div
          className="confirmed-guests-heading"
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
            amount: 0.15,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
          }}
        >
          <Heart
            size={25}
            strokeWidth={1.2}
            aria-hidden="true"
          />

          <p className="confirmed-guests-eyebrow">
            CELEBRATING WITH US
          </p>

          <h2 id="confirmed-guests-title">
            Confirmed Guests
          </h2>

          <p className="confirmed-guests-subtitle">
            The wonderful people joining us
            as we begin our forever.
          </p>

          <GoldDivider />
        </motion.div>

        {/* STATISTICS */}

        <div className="confirmed-guests-stats">
          <motion.div
            className="confirmed-guests-stat"
            initial={{
              opacity: reducedMotion ? 1 : 0,
              y: reducedMotion ? 0 : 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
            }}
          >
            <Users size={26} strokeWidth={1.3} />

            <strong>{totalAttendees}</strong>

            <span>TOTAL ATTENDEES</span>
          </motion.div>

          <motion.div
            className="confirmed-guests-stat"
            initial={{
              opacity: reducedMotion ? 1 : 0,
              y: reducedMotion ? 0 : 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              delay: reducedMotion ? 0 : 0.1,
            }}
          >
            <CheckCircle2 size={26} strokeWidth={1.3} />

            <strong>{totalRSVPs}</strong>

            <span>CONFIRMED RSVPs</span>
          </motion.div>
        </div>

        {/* SEARCH */}

        <div className="confirmed-guests-toolbar">
          <div className="confirmed-guests-search">
            <Search
              size={19}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Search confirmed guests..."
              aria-label="Search confirmed guests"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowAll(false);
              }}
            />
          </div>
        </div>

        {/* GUEST LIST */}

        {visibleGuests.length > 0 ? (
          <div
            className="confirmed-guests-grid"
            aria-live="polite"
          >
            {visibleGuests.map((guest) => (
              <div
                key={guest.id}
                className="confirmed-guest-card"
              >
                <div className="confirmed-guest-avatar">
                  <UserRoundCheck
                    size={24}
                    strokeWidth={1.4}
                  />
                </div>

                <h3>{guest.fullName}</h3>

                <p>
                  {guest.guestCount}{" "}
                  {guest.guestCount === 1
                    ? "Attendee"
                    : "Attendees"}
                </p>

                <div className="confirmed-guest-status">
                  <CheckCircle2
                    size={15}
                    strokeWidth={1.6}
                  />

                  <span>CONFIRMED</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="confirmed-guests-empty">
            <Users size={28} strokeWidth={1.2} />

            <p>
              {search.trim()
                ? "No confirmed guests match your search."
                : "No confirmed guests yet."}
            </p>
          </div>
        )}

        {/* SHOW MORE */}

        {!search.trim() &&
          filteredGuests.length > 8 && (
            <button
              type="button"
              className="confirmed-guests-show-more"
              onClick={() =>
                setShowAll((previous) => !previous)
              }
            >
              {showAll
                ? "SHOW LESS"
                : `VIEW ALL ${filteredGuests.length} GUESTS`}
            </button>
          )}

        {/* ENDING */}

        <div className="confirmed-guests-ending">
          <Heart
            size={20}
            strokeWidth={1.2}
            aria-hidden="true"
          />

          <p>
            Every confirmation brings us one step
            closer to celebrating together.
          </p>
        </div>
      </div>
    </section>
  );
}