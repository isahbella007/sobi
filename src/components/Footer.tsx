import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SunMark } from "@/components/hero/SunMark";
import { PaletteToggle } from "@/components/PaletteToggle";
import { services, socialLinks, postalCity } from "@/content/site";

export function Footer() {
  const serviceNames = services.map((service) => service.name).join(" · ");

  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 3, md: 6 },
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Box sx={{ width: 36, height: 36 }}>
        <SunMark />
      </Box>
      <Typography sx={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--text)" }}>
        SOBI Professionelle · {postalCity}
      </Typography>
      <Typography sx={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text)", opacity: 0.7 }}>
        {serviceNames}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {socialLinks.map((social) => (
          <Box
            key={social.label}
            component="a"
            href={social.href}
            sx={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "var(--text)",
              opacity: 0.6,
              "&:hover": { opacity: 1, color: "var(--accent)" },
            }}
          >
            {social.label}
          </Box>
        ))}
      </Box>
      <PaletteToggle />
    </Box>
  );
}
