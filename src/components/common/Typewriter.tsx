"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

type TypewriterProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  holdDuration?: number;
  color?: string;
};

// Loops through `words`, typing then deleting each in turn with a blinking
// cursor. Reduced-motion users get the first word statically, no cycling.
export function Typewriter({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  holdDuration = 2000,
  color = "var(--accent)",
}: TypewriterProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && subIndex === currentWord.length + 1) {
      const timeout = setTimeout(() => setIsDeleting(true), holdDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (isDeleting ? -1 : 1)),
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, holdDuration, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const blinkTimer = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkTimer);
  }, [reduceMotion]);

  const currentWord = words[wordIndex % words.length];
  const displayedText = reduceMotion ? currentWord : currentWord.substring(0, subIndex);

  return (
    <>
      <Box component="span" aria-hidden="true" sx={{ color, fontWeight: 600, whiteSpace: "nowrap" }}>
        {displayedText}
        {!reduceMotion && (
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              ml: "2px",
              verticalAlign: "text-bottom",
              bgcolor: color,
              opacity: blink ? 1 : 0,
            }}
          />
        )}
      </Box>
      {/* Static equivalent for assistive tech, since the visible text mutates constantly. */}
      <Box component="span" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {words.join(", ")}
      </Box>
    </>
  );
}
