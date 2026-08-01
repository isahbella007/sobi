"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Reveal } from "@/components/common/Reveal";
import { ServiceIcon } from "@/components/common/ServiceIcons";
import { NAV_HEIGHT } from "@/components/hero/sunDock";
import { priceListCategories, type PriceListItem } from "@/content/site";

type MenuRowProps = {
  item: PriceListItem;
  name: string;
  description: string;
  fromPrefix: string;
};

function MenuRow({ item, name, description, fromPrefix }: MenuRowProps) {
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
          top: NAV_HEIGHT,
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
