"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { Reveal } from "@/components/common/Reveal";
import { Avatar } from "@/components/common/Avatar";
import { testimonials } from "@/content/site";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const active = testimonials[activeIndex];

  function selectTestimonial(i: number) {
    if (i === activeIndex) return;
    setVisible(false);
    window.setTimeout(() => {
      setActiveIndex(i);
      setVisible(true);
    }, 180);
  }

  return (
    <Reveal
      as="section"
      id="testimonials"
      sx={{
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        bgcolor: "var(--contrast)",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: "var(--font-serif)",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "var(--text)",
          textAlign: "center",
          mb: { xs: 5, md: 6 },
        }}
      >
        Customers are our priority
      </Typography>

      {/* Avatar picker — click one to bring their quote up below. */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 1.5, md: 2 },
          mb: { xs: 5, md: 6 },
          maxWidth: 720,
          mx: "auto",
        }}
      >
        {testimonials.map((testimonial, i) => (
          <Box
            key={testimonial.name}
            component="button"
            type="button"
            onClick={() => selectTestimonial(i)}
            aria-label={`Show ${testimonial.name}'s testimonial`}
            aria-pressed={i === activeIndex}
            sx={{
              border: "none",
              background: "none",
              p: 0,
              cursor: "pointer",
              borderRadius: "50%",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              boxShadow: i === activeIndex ? "0 0 0 3px var(--accent)" : "0 0 0 0 transparent",
              transform: i === activeIndex ? "scale(1.15)" : "scale(1)",
            }}
          >
            <Avatar name={testimonial.name} size="sm" />
          </Box>
        ))}
      </Box>

      {/* Spotlight card for the active testimonial. */}
      <Box
        sx={{
          position: "relative",
          maxWidth: 640,
          mx: "auto",
          borderRadius: "24px",
          bgcolor: "var(--panel)",
          boxShadow: "0 24px 48px -24px color-mix(in oklch, var(--text) 40%, transparent)",
          px: { xs: 4, md: 7 },
          py: { xs: 5, md: 7 },
          textAlign: "center",
          overflow: "hidden",
          backgroundImage:
            "radial-gradient(color-mix(in oklch, var(--text) 12%, transparent) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <Typography
          aria-hidden
          sx={{
            position: "absolute",
            top: 12,
            left: 24,
            fontFamily: "var(--font-serif)",
            fontSize: "4.5rem",
            color: "var(--accent)",
            opacity: 0.15,
            lineHeight: 1,
          }}
        >
          &ldquo;
        </Typography>

        <Box sx={{ opacity: visible ? 1 : 0, transition: "opacity 0.18s ease" }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mb: 3 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} sx={{ fontSize: 20, color: "var(--highlight)" }} />
            ))}
          </Box>

          <Typography
            sx={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              color: "var(--text)",
              lineHeight: 1.7,
            }}
          >
            &ldquo;{active.quote}&rdquo;
          </Typography>

          <Box sx={{ width: 40, height: "1px", bgcolor: "var(--highlight)", mx: "auto", my: 3, opacity: 0.6 }} />

          <Typography sx={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--accent)" }}>
            {active.name} · {active.service}
          </Typography>
        </Box>
      </Box>
    </Reveal>
  );
}
