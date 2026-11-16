import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";

import { wedding } from "../data/wedding";

export default function MusicPlayer({ active }) {
  const audioRef = useRef(null);

  const [musicPlaying, setMusicPlaying] =
    useState(false);

  const [musicAvailable, setMusicAvailable] =
    useState(true);

  useEffect(() => {
    if (!active || !musicAvailable) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;
    audio.loop = true;
    audio.muted = false;

    const startMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.warn(
          "Music autoplay blocked:",
          error
        );
      }
    };

    startMusic();
  }, [active, musicAvailable]);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio || !musicAvailable) return;

    if (audio.paused) {
      try {
        audio.volume = 0.6;
        await audio.play();
      } catch (error) {
        console.warn(
          "Unable to play music:",
          error
        );
      }
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.musicFile}
        loop
        preload="auto"
        playsInline
        onError={() => {
          setMusicAvailable(false);
          setMusicPlaying(false);
        }}
        onPause={() => setMusicPlaying(false)}
        onPlay={() => setMusicPlaying(true)}
      />

      {active && musicAvailable && (
        <button
          type="button"
          className="music-toggle"
          onClick={toggleMusic}
          aria-label={
            musicPlaying
              ? "Pause background music"
              : "Play background music"
          }
          aria-pressed={musicPlaying}
        >
          {musicPlaying ? (
            <Music2 size={21} />
          ) : (
            <VolumeX size={21} />
          )}
        </button>
      )}
    </>
  );
}