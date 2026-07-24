import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Reveal } from "@/components/common/Reveal";
import { pricingCategories } from "@/content/site";

export async function Pricing() {
  const t = await getTranslations("pricing");
  const tServices = await getTranslations("services");

  return (
    <Reveal
      as="section"
      id="pricing"
      sx={{
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        bgcolor: "var(--panel)",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: "var(--font-serif)",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "var(--text)",
          textAlign: "center",
        }}
      >
        {t("heading")}
      </Typography>
      <Typography
        sx={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8rem",
          fontStyle: "italic",
          color: "var(--text)",
          opacity: 0.55,
          textAlign: "center",
          mt: 1,
          mb: { xs: 4, md: 6 },
        }}
      >
        {t("note")}
      </Typography>

      <Reveal
        stagger
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 4, md: 5 },
          maxWidth: 900,
          mx: "auto",
        }}
      >
        {pricingCategories.map((category) => (
          <Box
            key={category.id}
            sx={{
              borderRadius: "16px",
              border: "1px solid var(--highlight)",
              bgcolor: "var(--contrast)",
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.35rem",
                color: "var(--text)",
                mb: 2.5,
              }}
            >
              {tServices(`items.${category.id}.name`)}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {category.items.map((item) => (
                <Box key={item.id} sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      color: "var(--text)",
                      opacity: 0.85,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t(`categories.${category.id}.items.${item.id}`)}
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      borderBottom: "1px dotted var(--highlight)",
                      mb: "5px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.price}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Reveal>
    </Reveal>
  );
}
