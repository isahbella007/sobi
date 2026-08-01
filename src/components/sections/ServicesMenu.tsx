"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Reveal } from "@/components/common/Reveal";
import { ServiceIcon } from "@/components/common/ServiceIcons";
import { MenuRow } from "@/components/common/MenuRow";
import { priceListCategories } from "@/content/site";

// This component only ever renders under the /services page's compact Nav
// (see ServicesToggle.tsx / page.tsx), which is a fixed 72px, not the
// site-wide NAV_HEIGHT (96px) — hardcoded here to match.
const COMPACT_NAV_HEIGHT = 72;

export function ServicesMenu() {
  const t = useTranslations("priceList");
  const [activeCategory, setActiveCategory] = useState<string>(priceListCategories[0].id);
  const category = priceListCategories.find((c) => c.id === activeCategory) ?? priceListCategories[0];
  const fromPrefix = t("fromPrefix");

  return (
    <>
      <Box component="section" sx={{ px: { xs: 3, md: 6 }, py: { xs: 7, md: 9 }, bgcolor: "var(--bg)", textAlign: "center" }}>
        <Box sx={{ maxWidth: 680, mx: "auto" }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: { xs: "2.25rem", md: "clamp(2.5rem, 4vw, 3.5rem)" },
              color: "var(--text)",
              lineHeight: 1.15,
            }}
          >
            {t("heading")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-sans)",
              fontSize: { xs: "1rem", md: "1.05rem" },
              color: "var(--text)",
              opacity: 0.8,
              lineHeight: 1.7,
              mt: 2,
              maxWidth: 520,
              mx: "auto",
            }}
          >
            {t("subheading")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "var(--text)",
              opacity: 0.55,
              mt: 2,
            }}
          >
            {t("note")}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "sticky",
          top: COMPACT_NAV_HEIGHT,
          zIndex: 5,
          bgcolor: "var(--contrast)",
          borderBottom: "1px solid var(--highlight)",
        }}
      >
        <Tabs
          value={activeCategory}
          onChange={(_, next: string) => setActiveCategory(next)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 1, md: 0 },
            minHeight: 0,
            "& .MuiTabs-indicator": { bgcolor: "var(--accent)", height: "2px" },
            "& .MuiTab-root": {
              fontFamily: "var(--font-sans)",
              textTransform: "none",
              fontSize: "0.85rem",
              color: "var(--text)",
              opacity: 0.6,
              minHeight: 56,
              gap: 1,
            },
            "& .MuiTab-root.Mui-selected": { color: "var(--accent)", opacity: 1 },
          }}
        >
          {priceListCategories.map((cat) => (
            <Tab
              key={cat.id}
              value={cat.id}
              icon={<ServiceIcon id={cat.id} sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label={t(`tabs.${cat.id}`)}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 6, md: 8 }, maxWidth: 1100, mx: "auto" }}>
        {category.id === "footCare" && (
          <Typography
            sx={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              fontStyle: "italic",
              color: "var(--accent)",
              mb: 4,
              textAlign: "center",
            }}
          >
            {t("footCareNote")}
          </Typography>
        )}

        <Reveal
          stagger
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: category.groups.length > 1 ? "1fr 1fr" : "1fr" },
            gap: { xs: 4, md: 5 },
          }}
        >
          {category.groups.map((group) => (
            <Box
              key={`${category.id}-${group.id}`}
              sx={{
                borderRadius: "16px",
                border: "1px solid var(--highlight)",
                bgcolor: "var(--contrast)",
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--highlight)",
                  mb: 2,
                }}
              >
                {t(`groups.${group.id}`)}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {group.items.map((item) => (
                  <MenuRow
                    key={item.id}
                    item={item}
                    name={t(`items.${item.id}.name`)}
                    description={t(`items.${item.id}.description`)}
                    fromPrefix={fromPrefix}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Reveal>
      </Box>
    </>
  );
}
