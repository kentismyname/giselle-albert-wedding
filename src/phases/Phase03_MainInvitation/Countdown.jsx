import { motion } from "framer-motion";

import GoldDivider from "../../components/GoldDivider";
import useCountdown, {
  formatNumber,
} from "../../hooks/useCountdown";

export default function Countdown({
  reducedMotion,
}) {
  const countdown = useCountdown();

  return (
    <section
      id="countdown"
      className="countdown-section"
    >
      <div className="section-container">
        <motion.div
          initial={{
            opacity: 0,
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
          <p className="section-eyebrow">
            OUR SPECIAL DAY
          </p>

          <h2 className="section-title">
            Countdown to
            <br />
            Our Forever
          </h2>

          <p className="section-subtitle">
            Every moment brings us
            closer to forever.
          </p>

          <div
            className="countdown-grid"
            role="timer"
            aria-label="Time remaining until the wedding"
            aria-live="off"
          >
            {[
              ["Days", countdown.days],
              ["Hours", countdown.hours],
              ["Minutes", countdown.minutes],
              ["Seconds", countdown.seconds],
            ].map(([label, value]) => (
              <div
                className="countdown-item"
                key={label}
              >
                <div className="countdown-box">
                  <span>
                    {formatNumber(value)}
                  </span>
                </div>

                <p>{label}</p>
              </div>
            ))}
          </div>

          <GoldDivider />
        </motion.div>
      </div>
    </section>
  );
}