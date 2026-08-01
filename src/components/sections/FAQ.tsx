"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Reveal } from "@/components/common/Reveal";
import { faqCategories, phoneNumber } from "@/content/site";

export function FAQ() {
  const t = useTranslations("faq");
  // Keyed by category id so each category's accordion opens/closes
  // independently — expanding a question in one section doesn't collapse
  // an open question in another.
  const [expanded, setExpanded] = useState<Record<string, string | null>>({});

  return (
    <Reveal
      as="section"
      id="faq"
      sx={{
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        bgcolor: "var(--bg)",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: "var(--font-serif)",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "var(--text)",
          textAlign: "center",
          mb: { xs: 5, md: 7 },
        }}
      >
        {t("heading")}
      </Typography>

      <Reveal stagger sx={{ maxWidth: 760, mx: "auto", display: "flex", flexDirection: "column", gap: { xs: 5, md: 6 } }}>
        {faqCategories.map((category) => (
          <Box key={category.id}>
            <Typography
              sx={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--highlight)",
                mb: 1,
              }}
            >
              {t(`categories.${category.id}`)}
            </Typography>

            {category.questionIds.map((qid) => {
              const isOpen = expanded[category.id] === qid;
              return (
                <Accordion
                  key={qid}
                  expanded={isOpen}
                  onChange={(_, next) =>
                    setExpanded((prev) => ({ ...prev, [category.id]: next ? qid : null }))
                  }
                  disableGutters
                  elevation={0}
                  square
                  sx={{
                    bgcolor: "transparent",
                    borderBottom: "1px solid var(--highlight)",
                    "&:before": { display: "none" },
                    "&.Mui-expanded": { margin: 0 },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "var(--accent)" }} />}
                    sx={{ px: 0, "& .MuiAccordionSummary-content": { my: 2 } }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1rem",
                        color: isOpen ? "var(--accent)" : "var(--text)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {t(`items.${qid}.question`)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        color: "var(--text)",
                        opacity: 0.8,
                        lineHeight: 1.7,
                      }}
                    >
                      {t(`items.${qid}.answer`, { phone: phoneNumber })}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        ))}
      </Reveal>
    </Reveal>
  );
}
