import { Heart } from "lucide-react";

export default function GoldDivider() {
  return (
    <div
      className="main-gold-divider"
      aria-hidden="true"
    >
      <span />
      <Heart size={13} fill="currentColor" />
      <span />
    </div>
  );
}