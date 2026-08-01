import type { SvgIconComponent } from "@mui/icons-material";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import FrontHandOutlined from "@mui/icons-material/FrontHandOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
import Box from "@mui/material/Box";

// No MUI icon reads as "foot" (SquareFoot is a ruler), so footCare gets a
// small hand-drawn footprint; the other three map onto existing icons.
function FootprintIcon({ sx }: { sx?: object }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      fill="none"
      sx={{ width: 20, height: 20, display: "block", ...sx }}
    >
      <path
        d="M9.6 21c-1.4 0-2.5-1.1-2.5-2.6 0-1.8.6-3 .6-4.9 0-2.2-1.1-3.3-1.1-5.8C6.6 4.9 7.9 3 9.7 3c2 0 3.2 1.9 3.2 5 0 2.7-.9 3.9-.9 6.6 0 1.7.5 2.7.5 4.1 0 1.2-1.1 2.3-2.9 2.3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="7.9" cy="4.4" r="0.9" fill="currentColor" />
      <circle cx="10.2" cy="3.5" r="0.9" fill="currentColor" />
      <circle cx="12.3" cy="4" r="0.8" fill="currentColor" />
      <circle cx="14" cy="5.1" r="0.7" fill="currentColor" />
    </Box>
  );
}

const SERVICE_ICONS: Record<string, SvgIconComponent> = {
  skincare: SpaOutlined,
  handCare: FrontHandOutlined,
  waxing: WaterDropOutlined,
};

export function ServiceIcon({ id, sx }: { id: string; sx?: object }) {
  if (id === "footCare") return <FootprintIcon sx={sx} />;
  const Icon = SERVICE_ICONS[id];
  return Icon ? <Icon sx={{ fontSize: 20, ...sx }} /> : null;
}
