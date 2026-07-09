import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type LockedTileProps = {
  label: string;
  sub: string;
};

// Deliberately inert — no href/onClick/hover treatment — so it reads as a
// "premium feature on the way" rather than a broken link.
export function LockedTile({ label, sub }: LockedTileProps) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "16px",
        border: "1px solid color-mix(in oklab, var(--highlight) 40%, transparent)",
        bgcolor: "color-mix(in oklab, var(--panel) 60%, transparent)",
        backdropFilter: "blur(3px)",
        p: 3,
        cursor: "default",
      }}
    >
      <LockOutlinedIcon
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          fontSize: 18,
          color: "var(--text)",
          opacity: 0.5,
        }}
      />
      <Typography
        sx={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.1rem",
          color: "var(--text)",
          opacity: 0.6,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8rem",
          letterSpacing: "0.04em",
          fontStyle: "italic",
          color: "var(--text)",
          opacity: 0.5,
          mt: 0.5,
        }}
      >
        {sub}
      </Typography>
    </Box>
  );
}
