import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Reveal } from "@/components/common/Reveal";
import { bookingLink, phoneNumber } from "@/content/site";

export async function Book() {
  const t = await getTranslations("book");
  return (
    <Reveal
      as="section"
      id="book"
      sx={{
        mx: { xs: 3, md: 6 },
        my: { xs: 8, md: 12 },
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 6 },
        borderRadius: "16px",
        bgcolor: "var(--accent)",
        textAlign: "center",
      }}
    >
      <Typography
        component="h2"
        sx={{ fontFamily: "var(--font-serif)", fontSize: { xs: "1.75rem", md: "2.25rem" }, color: "var(--contrast)", mb: 1 }}
      >
        {t("heading")}
      </Typography>
      <Typography sx={{ fontFamily: "var(--font-sans)", color: "var(--contrast)", opacity: 0.9, mb: 4 }}>
        {t("subhead")}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
        <Button
          component="a"
          href={bookingLink}
          variant="contained"
          sx={{ bgcolor: "var(--contrast)", color: "var(--accent)", "&:hover": { bgcolor: "var(--contrast)", opacity: 0.9 } }}
        >
          {t("bookButton")}
        </Button>
        <Button component="a" href={`tel:${phoneNumber}`} variant="outlined" sx={{ borderColor: "var(--contrast)", color: "var(--contrast)" }}>
          {t("callButton")}
        </Button>
      </Box>
    </Reveal>
  );
}
