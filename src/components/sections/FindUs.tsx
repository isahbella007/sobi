import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Reveal } from "@/components/common/Reveal";
import { streetAddress, postalCity, openingHours, mapEmbedSrc } from "@/content/site";

export function FindUs() {
  return (
    <Reveal
      as="section"
      id="find-us"
      sx={{
        mx: { xs: 3, md: 6 },
        my: { xs: 6, md: 8 },
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
        borderRadius: "16px",
        bgcolor: "var(--panel)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        <Box
          component="iframe"
          src={mapEmbedSrc}
          loading="lazy"
          title="SOBI Professionelle — map"
          sx={{
            border: "1px solid var(--highlight)",
            borderRadius: "16px",
            width: "100%",
            height: { xs: 300, md: 380 },
            flex: { md: "1 1 55%" },
          }}
        />

        <Box sx={{ flex: { md: "1 1 45%" }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            component="h2"
            sx={{ fontFamily: "var(--font-serif)", fontSize: { xs: "1.75rem", md: "2.25rem" }, color: "var(--text)", mb: 2 }}
          >
            Find us in the 12th
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, mb: 1 }}>
            {streetAddress}, {postalCity}
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, mb: 2 }}>
            {openingHours}
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--accent)", fontStyle: "italic" }}>
            Easy to reach, easy to relax.
          </Typography>
        </Box>
      </Box>
    </Reveal>
  );
}
