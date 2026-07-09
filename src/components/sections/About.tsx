import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Reveal } from "@/components/common/Reveal";
import { Avatar } from "@/components/common/Avatar";
import { daughterName, daughterPhoto } from "@/content/site";

export function About() {
  return (
    <Reveal
      as="section"
      id="about"
      sx={{
        mx: { xs: 3, md: 6 },
        mt: 0,
        mb: { xs: 6, md: 8 },
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 8 },
        borderRadius: "16px",
        bgcolor: "var(--panel)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
          maxWidth: 860,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <Avatar name="Sobi" size="lg" />
          <Avatar name={daughterName} src={daughterPhoto} size="lg" />
        </Box>

        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-serif)",
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              color: "var(--text)",
              mb: 2,
            }}
          >
            Two generations of care
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--text)", opacity: 0.85, lineHeight: 1.7 }}>
            SOBI is a small Vienna studio run by Sobi and her daughter {daughterName}. What
            started with one pair of expert hands is now two — the same attention to detail,
            passed down. We treat every client the way we&rsquo;d treat family: unhurried,
            thorough, and genuinely glad you came.
          </Typography>
        </Box>
      </Box>
    </Reveal>
  );
}
