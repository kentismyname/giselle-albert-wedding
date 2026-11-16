import { CalendarDays } from "lucide-react";

import GoldDivider from "../../components/GoldDivider";

import {
  wedding,
  weddingDate,
} from "../../data/wedding";

export default function SaveTheDate() {
  const month = weddingDate
    .toLocaleDateString("en-US", {
      month: "long",
      timeZone: "Asia/Manila",
    })
    .toUpperCase();

  const day = weddingDate.toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      timeZone: "Asia/Manila",
    }
  );

  const year = weddingDate.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      timeZone: "Asia/Manila",
    }
  );

  return (
    <section
      id="save-date"
      className="save-date-section"
    >
      <div className="section-container">
        <p className="section-eyebrow">
          MARK YOUR CALENDAR
        </p>

        <h2 className="section-title">
          Save the Date
        </h2>

        <GoldDivider />

        <div className="save-date-card">
          <CalendarDays
            size={27}
            strokeWidth={1.2}
            className="save-date-icon"
          />

          <p className="save-date-month">
            {month}
          </p>

          <div className="save-date-number">
            <span>{day}</span>
          </div>

          <p className="save-date-year">
            {year}
          </p>

          <div className="save-date-line" />

          <p className="save-date-couple">
            {wedding.bride} &amp; {wedding.groom}
          </p>

          <p className="save-date-location">
            {wedding.location}
          </p>
        </div>
      </div>
    </section>
  );
}