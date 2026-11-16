import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import {
  wedding,
  formattedDate,
  navigation,
} from "../data/wedding";

export default function FloatingNavigation({
  menuOpen,
  setMenuOpen,
  reducedMotion,
}) {
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

  return (
    <>
      <div className="floating-controls">
        <button
          type="button"
          className="floating-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={menuOpen}
          aria-controls="wedding-navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="wedding-navigation"
            className="navigation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.25,
            }}
            aria-label="Wedding sections"
          >
            <p className="nav-eyebrow">
              THE WEDDING OF
            </p>

            <h2>
              {wedding.bride}
              <span>&amp;</span>
              {wedding.groom}
            </h2>

            <div className="nav-links">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="nav-date">
              {formattedDate}
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}