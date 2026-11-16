
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Heart,
  Mail,
  UserRound,
  Phone,
  Users,
  MessageSquareHeart,
  CheckCircle2,
  Send,
  ArrowLeft,
  CalendarHeart,
} from "lucide-react";

import GoldDivider from "../../components/GoldDivider";

import {
  wedding,
  weddingDate,
} from "../../data/wedding";

/* =========================================
   MOCK RSVP STORAGE
========================================= */

const STORAGE_KEY = "giselle-albert-rsvp-demo";

const saveMockRSVP = (submission) => {
  try {
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const submissions = Array.isArray(existing)
      ? existing
      : [];

    submissions.push(submission);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(submissions)
    );

    return true;
  } catch (error) {
    console.error("Mock RSVP storage error:", error);
    return false;
  }
};

/* =========================================
   DATE FORMATTER
========================================= */

const formatWeddingDate = () => {
  return weddingDate.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/* =========================================
   INITIAL FORM
========================================= */

const initialForm = {
  fullName: "",
  contactNumber: "",
  attendance: "",
  guestCount: "1",
  message: "",
};

/* =========================================
   PHASE 08 — RSVP
========================================= */

export default function RSVP({
  reducedMotion = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedSubmission, setSavedSubmission] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);

  /* =====================================
     UPDATE FORM
  ===================================== */

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  /* =====================================
     VALIDATION
  ===================================== */

  const validateForm = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    } else if (form.fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter a valid name.";
    }

    const contact = form.contactNumber.trim();

    if (!contact) {
      nextErrors.contactNumber =
        "Please enter your contact number.";
    } else if (!/^[+\d\s()-]{7,20}$/.test(contact)) {
      nextErrors.contactNumber =
        "Please enter a valid contact number.";
    }

    if (!["accept", "decline"].includes(form.attendance)) {
      nextErrors.attendance =
        "Please select your attendance.";
    }

    const count = Number(form.guestCount);

    if (
      form.attendance === "accept" &&
      (!Number.isInteger(count) || count < 1 || count > 5)
    ) {
      nextErrors.guestCount =
        "Please select between 1 and 5 guests.";
    }

    return nextErrors;
  };

  /* =====================================
     SUBMIT RSVP
  ===================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (submitting) return;

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const submission = {
      id: `RSVP-${Date.now()}`,
      fullName: form.fullName.trim(),
      contactNumber: form.contactNumber.trim(),
      attendance: form.attendance,
      guestCount:
        form.attendance === "accept"
          ? Number(form.guestCount)
          : 0,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
      status: "mock",
    };

    const stored = saveMockRSVP(submission);

        if (stored) {
    window.dispatchEvent(
        new Event("wedding-rsvp-updated")
    );
    }

    setSavedSubmission(submission);
    setStorageWarning(!stored);
    setSubmitted(true);
    setSubmitting(false);
  };

  /* =====================================
     RESET FORM
  ===================================== */

  const resetForm = () => {
    setForm({ ...initialForm });
    setErrors({});
    setSubmitted(false);
    setSavedSubmission(null);
    setStorageWarning(false);
  };

  /* =====================================
     ANIMATION SETTINGS
  ===================================== */

  const reveal = {
    initial: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 30,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: {
      duration: reducedMotion ? 0 : 0.7,
    },
  };

  return (
    <section
      id="rsvp"
      className="rsvp-section"
      aria-labelledby="rsvp-title"
    >
      <div className="rsvp-container">
        {/* =====================================
            HEADING
        ===================================== */}

        <motion.div
          className="rsvp-heading"
          {...reveal}
        >
          <p className="rsvp-eyebrow">
            THE FAVOR OF YOUR REPLY
          </p>

          <h2 id="rsvp-title">
            RSVP
          </h2>

          <p className="rsvp-subtitle">
            A beautiful celebration is made
            even more special with you there.
          </p>

          <GoldDivider />
        </motion.div>

        {/* =====================================
            RSVP CARD
        ===================================== */}

        <motion.div
          className="rsvp-card"
          {...reveal}
        >
          <div className="rsvp-card-decoration">
            <Heart
              size={24}
              strokeWidth={1.2}
              aria-hidden="true"
            />
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="rsvp-form"
                className="rsvp-form-content"
                initial={{
                  opacity: 0,
                  y: reducedMotion ? 0 : 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: reducedMotion ? 0 : -15,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                }}
              >
                <div className="rsvp-form-heading">
                  <span>YOU ARE INVITED</span>

                  <h3>
                    Kindly Respond
                  </h3>

                  <p>
                    Please let us know if you'll
                    be joining our special day.
                  </p>
                </div>

                <div className="rsvp-event-summary">
                  <CalendarHeart
                    size={19}
                    strokeWidth={1.4}
                  />

                  <span>
                    {formatWeddingDate()}
                  </span>
                </div>

                <form
                  className="rsvp-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* FULL NAME */}

                  <div className="rsvp-field">
                    <label htmlFor="rsvp-full-name">
                      FULL NAME
                    </label>

                    <div className="rsvp-input-wrap">
                      <UserRound
                        size={19}
                        strokeWidth={1.5}
                      />

                      <input
                        id="rsvp-full-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        maxLength={100}
                        value={form.fullName}
                        onChange={(event) =>
                          updateForm(
                            "fullName",
                            event.target.value
                          )
                        }
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName
                            ? "rsvp-name-error"
                            : undefined
                        }
                      />
                    </div>

                    {errors.fullName && (
                      <span
                        id="rsvp-name-error"
                        className="rsvp-error"
                      >
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* CONTACT NUMBER */}

                  <div className="rsvp-field">
                    <label htmlFor="rsvp-contact">
                      CONTACT NUMBER
                    </label>

                    <div className="rsvp-input-wrap">
                      <Phone
                        size={19}
                        strokeWidth={1.5}
                      />

                      <input
                        id="rsvp-contact"
                        type="tel"
                        autoComplete="tel"
                        placeholder="09XX XXX XXXX"
                        maxLength={20}
                        value={form.contactNumber}
                        onChange={(event) =>
                          updateForm(
                            "contactNumber",
                            event.target.value
                          )
                        }
                        aria-invalid={Boolean(errors.contactNumber)}
                        aria-describedby={
                          errors.contactNumber
                            ? "rsvp-contact-error"
                            : undefined
                        }
                      />
                    </div>

                    {errors.contactNumber && (
                      <span
                        id="rsvp-contact-error"
                        className="rsvp-error"
                      >
                        {errors.contactNumber}
                      </span>
                    )}
                  </div>

                  {/* ATTENDANCE */}

                  <fieldset className="rsvp-attendance">
                    <legend>
                      WILL YOU BE ATTENDING?
                    </legend>

                    <div className="rsvp-attendance-options">
                      <label
                        className={`rsvp-attendance-option ${
                          form.attendance === "accept"
                            ? "is-selected"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="accept"
                          checked={form.attendance === "accept"}
                          onChange={() =>
                            updateForm(
                              "attendance",
                              "accept"
                            )
                          }
                        />

                        <Heart
                          size={23}
                          strokeWidth={1.4}
                        />

                        <strong>
                          Joyfully Accepts
                        </strong>

                        <span>
                          I'll be there!
                        </span>
                      </label>

                      <label
                        className={`rsvp-attendance-option ${
                          form.attendance === "decline"
                            ? "is-selected"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="decline"
                          checked={form.attendance === "decline"}
                          onChange={() =>
                            updateForm(
                              "attendance",
                              "decline"
                            )
                          }
                        />

                        <Mail
                          size={23}
                          strokeWidth={1.4}
                        />

                        <strong>
                          Regretfully Declines
                        </strong>

                        <span>
                          Sorry, I can't make it.
                        </span>
                      </label>
                    </div>

                    {errors.attendance && (
                      <span
                        className="rsvp-error"
                        role="alert"
                      >
                        {errors.attendance}
                      </span>
                    )}
                  </fieldset>

                  {/* NUMBER OF GUESTS */}

                  <AnimatePresence>
                    {form.attendance === "accept" && (
                      <motion.div
                        className="rsvp-field"
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        transition={{
                          duration: reducedMotion ? 0 : 0.3,
                        }}
                      >
                        <label htmlFor="rsvp-guests">
                          NUMBER OF ATTENDING GUESTS
                        </label>

                        <div className="rsvp-input-wrap">
                          <Users
                            size={19}
                            strokeWidth={1.5}
                          />

                          <select
                            id="rsvp-guests"
                            value={form.guestCount}
                            onChange={(event) =>
                              updateForm(
                                "guestCount",
                                event.target.value
                              )
                            }
                          >
                            <option value="1">
                              1 Guest — Just Me
                            </option>

                            <option value="2">
                              2 Guests
                            </option>

                            <option value="3">
                              3 Guests
                            </option>

                            <option value="4">
                              4 Guests
                            </option>

                            <option value="5">
                              5 Guests
                            </option>
                          </select>
                        </div>

                        {errors.guestCount && (
                          <span className="rsvp-error">
                            {errors.guestCount}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* MESSAGE */}

                  <div className="rsvp-field">
                    <label htmlFor="rsvp-message">
                      MESSAGE FOR THE COUPLE
                      <span> (OPTIONAL)</span>
                    </label>

                    <div className="rsvp-textarea-wrap">
                      <MessageSquareHeart
                        size={19}
                        strokeWidth={1.5}
                      />

                      <textarea
                        id="rsvp-message"
                        rows={4}
                        maxLength={500}
                        placeholder="Share your wishes for the happy couple..."
                        value={form.message}
                        onChange={(event) =>
                          updateForm(
                            "message",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="rsvp-submit-button"
                    disabled={submitting}
                  >
                    <Send
                      size={18}
                      strokeWidth={1.6}
                    />

                    <span>
                      {submitting
                        ? "SUBMITTING..."
                        : "SEND MY RESPONSE"}
                    </span>
                  </button>

                  <p className="rsvp-form-note">
                    RSVP demonstration — responses are
                    saved only in this browser.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="rsvp-success"
                className="rsvp-success"
                initial={{
                  opacity: 0,
                  scale: reducedMotion ? 1 : 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.4,
                }}
                role="status"
              >
                <div className="rsvp-success-icon">
                  <CheckCircle2
                    size={55}
                    strokeWidth={1.2}
                  />
                </div>

                <span className="rsvp-success-eyebrow">
                  RESPONSE RECORDED
                </span>

                <h3>
                  {savedSubmission?.attendance === "accept"
                    ? "Thank You!"
                    : "We'll Miss You!"}
                </h3>

                <p className="rsvp-success-name">
                  {savedSubmission?.fullName}
                </p>

                <p className="rsvp-success-message">
                  {savedSubmission?.attendance === "accept"
                    ? `We're delighted that you'll be joining us${
                        savedSubmission.guestCount > 1
                          ? ` with ${savedSubmission.guestCount} guests in total`
                          : ""
                      } on our special day.`
                    : "Thank you for letting us know. You'll be with us in spirit as we celebrate our wedding."}
                </p>

                {storageWarning && (
                  <p className="rsvp-storage-warning">
                    Your browser couldn't save this response.
                    Please try again if you want to keep a
                    local copy.
                  </p>
                )}

                <div className="rsvp-success-divider">
                  <Heart
                    size={17}
                    fill="currentColor"
                  />
                </div>

                <span className="rsvp-success-couple">
                  {wedding.bride} &amp; {wedding.groom}
                </span>

                <p className="rsvp-demo-notice">
                  Demo only — your response has not
                  been sent to the couple.
                </p>

                <button
                  type="button"
                  className="rsvp-reset-button"
                  onClick={resetForm}
                >
                  <ArrowLeft size={17} />
                  SUBMIT ANOTHER RESPONSE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ENDING */}

        <motion.div
          className="rsvp-ending"
          {...reveal}
        >
          <Heart
            size={22}
            strokeWidth={1.2}
          />

          <p>
            We can't wait to share this
            beautiful moment with you.
          </p>

          <span>
            With love, {wedding.bride} &amp; {wedding.groom}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
