"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { PriceListItem } from "@/content/site";

type MenuRowProps = {
  item: PriceListItem;
  name: string;
  description: string;
  fromPrefix: string;
};

export function MenuRow({ item, name, description, fromPrefix }: MenuRowProps) {
  const [expanded, setExpanded] = useState(false);
  const hasDescription = description.length > 0;

  return (
    <Box>
      <Box
        onClick={hasDescription ? () => setExpanded((e) => !e) : undefined}
        role={hasDescription ? "button" : undefined}
        tabIndex={hasDescription ? 0 : undefined}
        aria-expanded={hasDescription ? expanded : undefined}
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 1.5,
          py: 1.75,
          cursor: hasDescription ? "pointer" : "default",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            color: "var(--text)",
          }}
        >
          {name}
        </Typography>
        <Box sx={{ flex: 1, borderBottom: "1px dotted var(--highlight)", mb: "5px" }} />
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, flexShrink: 0 }}>
          {item.fromPrice && (
            <Typography
              sx={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text)", opacity: 0.6 }}
            >
              {fromPrefix}
            </Typography>
          )}
          <Typography
            sx={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--accent)" }}
          >
            {item.price}
          </Typography>
          {hasDescription && (
            <ExpandMoreIcon
              sx={{
                fontSize: 18,
                color: "var(--accent)",
                transition: "transform 0.3s ease",
                transform: expanded ? "rotate(180deg)" : "none",
              }}
            />
          )}
        </Box>
      </Box>
      {hasDescription && (
        <Collapse in={expanded}>
          <Typography
            sx={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              color: "var(--text)",
              opacity: 0.75,
              lineHeight: 1.6,
              pb: 2,
              pr: { xs: 0, md: 8 },
            }}
          >
            {description}
          </Typography>
        </Collapse>
      )}
    </Box>
  );
}
