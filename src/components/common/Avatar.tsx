import Box from "@mui/material/Box";

type AvatarProps = {
  name?: string;
  src?: string;
  size?: "sm" | "lg";
};

const SIZE_PX = { sm: 56, lg: 96 };

function getInitials(name?: string) {
  if (!name || name.startsWith("[")) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// Renders a real photo when `src` is given, otherwise falls back to
// initials over a themed circle.
export function Avatar({ name, src, size = "sm" }: AvatarProps) {
  const px = SIZE_PX[size];

  return (
    <Box
      role="img"
      aria-label={name ?? "Placeholder avatar"}
      sx={{
        width: px,
        height: px,
        flexShrink: 0,
        borderRadius: "50%",
        overflow: "hidden",
        bgcolor: "var(--panel)",
        border: "1px solid var(--highlight)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-serif)",
        fontSize: px * 0.36,
        color: "var(--text)",
      }}
    >
      {src ? (
        <Box component="img" src={src} alt={name ?? ""} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        getInitials(name)
      )}
    </Box>
  );
}
