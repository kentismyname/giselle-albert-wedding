import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Images,
} from "lucide-react";

import GoldDivider from "../../components/GoldDivider";

import {
  wedding,
  galleryPhotos,
} from "../../data/wedding";

/* =========================================
   GALLERY IMAGE
========================================= */

function GalleryImage({
  photo,
  index,
  onOpen,
  reducedMotion,
}) {
  const [imageFailed, setImageFailed] =
    useState(false);

  return (
    <motion.button
      type="button"
      className={`gallery-photo ${
        photo.size ? `gallery-photo--${photo.size}` : ""
      }`}
      onClick={() => onOpen(index)}
      aria-label={`View photo ${index + 1}: ${photo.alt}`}
      initial={{
        opacity: reducedMotion ? 1 : 0,
        y: reducedMotion ? 0 : 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : (index % 4) * 0.08,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -4 }
      }
    >
      {!photo.src || imageFailed ? (
        <div className="gallery-image-placeholder">
          <Heart
            size={32}
            strokeWidth={1}
            aria-hidden="true"
          />

          <span>OUR MEMORIES</span>
        </div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      )}

      <span
        className="gallery-photo-overlay"
        aria-hidden="true"
      >
        <span className="gallery-photo-caption">
          {photo.caption}
        </span>

        <span className="gallery-photo-view">
          VIEW PHOTO
        </span>
      </span>
    </motion.button>
  );
}

/* =========================================
   GALLERY LIGHTBOX
========================================= */

function GalleryLightbox({
  activeIndex,
  setActiveIndex,
  onClose,
  reducedMotion,
}) {
  const closeButtonRef = useRef(null);
  const touchStartRef = useRef(null);

  const total = galleryPhotos.length;
  const photo = galleryPhotos[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      (current - 1 + total) % total
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      (current + 1) % total
    );
  };

  /*
   * Preserve the current active index for keyboard
   * events without re-registering the listener
   * on every photo change.
   */

  const actionsRef = useRef({
    onClose,
    showPrevious,
    showNext,
  });

  actionsRef.current = {
    onClose,
    showPrevious,
    showNext,
  };

  useEffect(() => {
  const previousFocus = document.activeElement;

  closeButtonRef.current?.focus({
    preventScroll: true,
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      actionsRef.current.onClose();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      actionsRef.current.showPrevious();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      actionsRef.current.showNext();
      return;
    }

    if (event.key === "Tab") {
      const focusable = Array.from(
        document.querySelectorAll(
          ".gallery-lightbox button:not(:disabled)"
        )
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    document.removeEventListener(
      "keydown",
      handleKeyDown
    );

    previousFocus?.focus?.({
      preventScroll: true,
    });
  };
}, []);

  const handleTouchStart = (event) => {
    touchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) return;

    const deltaX =
      event.changedTouches[0].clientX -
      touchStartRef.current.x;

    const deltaY =
      event.changedTouches[0].clientY -
      touchStartRef.current.y;

    touchStartRef.current = null;

    if (
      Math.abs(deltaX) < 55 ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      showNext();
    } else {
      showPrevious();
    }
  };

  if (!photo) return null;

  return (
    <motion.div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding photo gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.25,
      }}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="gallery-lightbox-close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X size={25} />
      </button>

      <div className="gallery-lightbox-counter">
        {activeIndex + 1} / {total}
      </div>

      <button
        type="button"
        className="gallery-lightbox-arrow gallery-lightbox-prev"
        onClick={(event) => {
          event.stopPropagation();
          showPrevious();
        }}
        aria-label="Previous photo"
      >
        <ChevronLeft size={27} />
      </button>

      <div
        className="gallery-lightbox-content"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            className="gallery-lightbox-image-wrap"
            initial={{
              opacity: 0,
              scale: reducedMotion ? 1 : 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: reducedMotion ? 1 : 0.96,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.25,
            }}
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.nextElementSibling?.removeAttribute(
                    "hidden"
                  );
                }}
              />
            ) : null}

            <div
              className="gallery-lightbox-fallback"
              hidden={Boolean(photo.src)}
            >
              <Heart size={40} strokeWidth={1} />
              <span>OUR MEMORIES</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="gallery-lightbox-caption">
          {photo.caption}
        </p>
      </div>

      <button
        type="button"
        className="gallery-lightbox-arrow gallery-lightbox-next"
        onClick={(event) => {
          event.stopPropagation();
          showNext();
        }}
        aria-label="Next photo"
      >
        <ChevronRight size={27} />
      </button>
    </motion.div>
  );
}

/* =========================================
   PHASE 05 — GALLERY
========================================= */

export default function Gallery({
  reducedMotion = false,
}) {
  const [activeIndex, setActiveIndex] =
    useState(null);

  const isLightboxOpen = activeIndex !== null;

  /* =====================================
     MOBILE-SAFE SCROLL LOCK
     PRESERVE EXACT SCROLL POSITION
  ===================================== */

  useLayoutEffect(() => {
    if (!isLightboxOpen) return;

    const body = document.body;
    const html = document.documentElement;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    const previousHtmlOverflow = html.style.overflow;

    /* LOCK BACKGROUND */

    html.style.overflow = "hidden";

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    /* RESTORE ON CLOSE */

    return () => {
      body.style.position =
        previousBodyStyles.position;

      body.style.top =
        previousBodyStyles.top;

      body.style.left =
        previousBodyStyles.left;

      body.style.right =
        previousBodyStyles.right;

      body.style.width =
        previousBodyStyles.width;

      body.style.overflow =
        previousBodyStyles.overflow;

      html.style.overflow =
        previousHtmlOverflow;

      window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: "instant",
      });
    };
  }, [isLightboxOpen]);

  return (
    <section
      id="gallery"
      className="gallery-section"
      aria-labelledby="gallery-title"
    >
      <div className="gallery-container">

        {/* SECTION HEADING */}

        <motion.div
          className="gallery-heading"
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
          <p className="gallery-eyebrow">
            MOMENTS TO TREASURE
          </p>

          <h2
            id="gallery-title"
            className="gallery-title"
          >
            Our Gallery
          </h2>

          <p className="gallery-subtitle">
            A collection of beautiful memories
            <br />
            that tell the story of us.
          </p>

          <GoldDivider />
        </motion.div>

        {/* PHOTO GRID */}

        <div className="gallery-grid">
          {galleryPhotos.map((photo, index) => (
            <GalleryImage
              key={photo.id}
              photo={photo}
              index={index}
              onOpen={setActiveIndex}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ENDING */}

        <motion.div
          className="gallery-ending"
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
            amount: 0.3,
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
            Every picture holds a memory.
            <br />
            Every memory tells our story.
          </p>

          <span>
            {wedding.bride} &amp; {wedding.groom}
          </span>
        </motion.div>
      </div>

      {/* FULLSCREEN LIGHTBOX — PORTAL */}

    {createPortal(
    <AnimatePresence>
        {isLightboxOpen && (
        <GalleryLightbox
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onClose={() => setActiveIndex(null)}
            reducedMotion={reducedMotion}
        />
        )}
    </AnimatePresence>,
    document.body
    )}
    </section>
  );
}