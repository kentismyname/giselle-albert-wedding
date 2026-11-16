
import { motion } from "framer-motion";
import {
  Heart,
  Crown,
  Users,
  Flame,
  Ribbon,
  Flower2,
  Gem,
  BookOpen,
  Coins,
} from "lucide-react";

import GoldDivider from "../../components/GoldDivider";
import { entourage } from "../../data/wedding";

/* =========================================
   SCROLL REVEAL
========================================= */

function Reveal({
  children,
  reducedMotion,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: reducedMotion ? 1 : 0,
        y: reducedMotion ? 0 : 28,
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
   SECTION HEADING
========================================= */

function EntourageHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon = Heart,
  reducedMotion,
}) {
  return (
    <Reveal
      className="entourage-group-heading"
      reducedMotion={reducedMotion}
    >
      <Icon
        size={23}
        strokeWidth={1.3}
        aria-hidden="true"
      />

      <span className="entourage-group-eyebrow">
        {eyebrow}
      </span>

      <h3>{title}</h3>

      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  );
}

/* =========================================
   PRINCIPAL SPONSORS
========================================= */

function PrincipalSponsors({ reducedMotion }) {
  const data = entourage.principalSponsors;

  return (
    <div className="entourage-group">
      <EntourageHeading
        eyebrow="OUR GUIDING LIGHTS"
        title={data.title}
        subtitle={data.subtitle}
        icon={Crown}
        reducedMotion={reducedMotion}
      />

      <div className="entourage-sponsors-grid">
        {data.pairs.map((pair, index) => (
          <Reveal
            key={pair.id}
            className="entourage-sponsor-pair"
            reducedMotion={reducedMotion}
            delay={(index % 2) * 0.08}
          >
            <span className="entourage-pair-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p>{pair.male}</p>

            <Heart
              size={13}
              strokeWidth={1.2}
              aria-hidden="true"
            />

            <p>{pair.female}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* =========================================
   HONOR ATTENDANTS
========================================= */

function HonorAttendants({ reducedMotion }) {
  return (
    <div className="entourage-group">
      <EntourageHeading
        eyebrow="BY OUR SIDE"
        title="Our Honor Attendants"
        subtitle="The special people standing closest to our hearts"
        icon={Heart}
        reducedMotion={reducedMotion}
      />

      <div className="entourage-honor-grid">
        {entourage.honorAttendants.map((person, index) => (
          <Reveal
            key={person.id}
            className="entourage-honor-card"
            reducedMotion={reducedMotion}
            delay={index * 0.12}
          >
            <div className="entourage-honor-icon">
              <Crown
                size={25}
                strokeWidth={1.2}
                aria-hidden="true"
              />
            </div>

            <span>{person.role}</span>

            <h4>{person.name}</h4>

            <div className="entourage-mini-divider">
              <span />
              <Heart size={12} fill="currentColor" />
              <span />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* =========================================
   BRIDESMAIDS & GROOMSMEN
========================================= */

function WeddingParty({ reducedMotion }) {
  const groups = [
    {
      id: "bridesmaids",
      title: "Bridesmaids",
      subtitle: "Standing beside the bride",
      names: entourage.bridesmaids,
    },
    {
      id: "groomsmen",
      title: "Groomsmen",
      subtitle: "Standing beside the groom",
      names: entourage.groomsmen,
    },
  ];

  return (
    <div className="entourage-group">
      <EntourageHeading
        eyebrow="OUR DEAREST FRIENDS"
        title="The Wedding Party"
        subtitle="Friends who have been part of our journey"
        icon={Users}
        reducedMotion={reducedMotion}
      />

      <div className="entourage-party-grid">
        {groups.map((group, index) => (
          <Reveal
            key={group.id}
            className="entourage-party-card"
            reducedMotion={reducedMotion}
            delay={index * 0.12}
          >
            <h4>{group.title}</h4>

            <span className="entourage-party-subtitle">
              {group.subtitle}
            </span>

            <div className="entourage-party-divider" />

            <ul>
              {group.names.map((name, nameIndex) => (
                <li key={`${group.id}-${nameIndex}`}>
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* =========================================
   SECONDARY SPONSORS
========================================= */

function SecondarySponsors({ reducedMotion }) {
  const icons = {
    candle: Flame,
    veil: Ribbon,
    cord: Gem,
  };

  return (
    <div className="entourage-group">
      <EntourageHeading
        eyebrow="SYMBOLS OF OUR UNION"
        title="Secondary Sponsors"
        subtitle="Sharing in the sacred traditions of our wedding"
        icon={Heart}
        reducedMotion={reducedMotion}
      />

      <div className="entourage-secondary-grid">
        {entourage.secondarySponsors.map(
          (sponsor, index) => {
            const Icon = icons[sponsor.id] || Heart;

            return (
              <Reveal
                key={sponsor.id}
                className="entourage-secondary-card"
                reducedMotion={reducedMotion}
                delay={(index % 3) * 0.1}
              >
                <div className="entourage-secondary-icon">
                  <Icon
                    size={26}
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>

                <h4>{sponsor.title}</h4>

                <span>{sponsor.subtitle}</span>

                <div className="entourage-secondary-divider" />

                {sponsor.names.map((name, nameIndex) => (
                  <p key={`${sponsor.id}-${nameIndex}`}>
                    {name}
                  </p>
                ))}
              </Reveal>
            );
          }
        )}
      </div>
    </div>
  );
}

/* =========================================
   LITTLE ENTOURAGE
========================================= */

function LittleEntourage({ reducedMotion }) {
  const icons = {
    "ring-bearer": Gem,
    "coin-bearer": Coins,
    "bible-bearer": BookOpen,
    "flower-girls": Flower2,
  };

  return (
    <div className="entourage-group entourage-group--last">
      <EntourageHeading
        eyebrow="OUR LITTLE STARS"
        title="Little Entourage"
        subtitle="The sweetest members of our wedding celebration"
        icon={Flower2}
        reducedMotion={reducedMotion}
      />

      <div className="entourage-little-grid">
        {entourage.littleEntourage.map((item, index) => {
          const Icon = icons[item.id] || Heart;

          return (
            <Reveal
              key={item.id}
              className="entourage-little-card"
              reducedMotion={reducedMotion}
              delay={(index % 4) * 0.08}
            >
              <Icon
                size={24}
                strokeWidth={1.3}
                aria-hidden="true"
              />

              <h4>{item.role}</h4>

              {item.names.map((name, nameIndex) => (
                <p key={`${item.id}-${nameIndex}`}>
                  {name}
                </p>
              ))}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================
   PHASE 07 — ENTOURAGE
========================================= */

export default function Entourage({
  reducedMotion = false,
}) {
  return (
    <section
      id="entourage"
      className="entourage-section"
      aria-labelledby="entourage-title"
    >
      <div className="entourage-container">
        <Reveal
          className="entourage-main-heading"
          reducedMotion={reducedMotion}
        >
          <p className="entourage-eyebrow">
            THE PEOPLE WE CHERISH
          </p>

          <h2 id="entourage-title">
            Our Entourage
          </h2>

          <p className="entourage-main-subtitle">
            Surrounded by love, guided by family,
            <br />
            and blessed with wonderful friends.
          </p>

          <GoldDivider />
        </Reveal>

        <PrincipalSponsors
          reducedMotion={reducedMotion}
        />

        <HonorAttendants
          reducedMotion={reducedMotion}
        />

        <WeddingParty
          reducedMotion={reducedMotion}
        />

        <SecondarySponsors
          reducedMotion={reducedMotion}
        />

        <LittleEntourage
          reducedMotion={reducedMotion}
        />

        <Reveal
          className="entourage-ending"
          reducedMotion={reducedMotion}
        >
          <Heart
            size={23}
            strokeWidth={1.2}
            aria-hidden="true"
          />

          <p>
            Every beautiful love story is made even more
            meaningful by the people who share in it.
          </p>

          <span>With love and gratitude</span>
        </Reveal>
      </div>
    </section>
  );
}
