import { createTheme } from "@mui/material/styles";

// No palette entry here may hold a var() reference: many MUI components
// (ToggleButton, ListItemButton, Tab, ...) call alpha()/lighten()/darken()
// on palette.text.primary or palette.*.main for their hover/selected
// overlays, which requires a real parseable color at style-computation
// time. So the palette stays a static Soft Luxury Clinic default, and the
// *rendered* colors are made reactive via plain `var(--x)` CSS instead —
// in globals.css for page-level background/text, and in the component
// overrides below for anything MUI renders (no color math involved there).
export const muiTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4eee3",
      paper: "#eae1d2",
    },
    text: {
      primary: "#3a2416",
      secondary: "#3a2416",
    },
    primary: {
      main: "#a55a2a",
      contrastText: "#fffcf6",
    },
    secondary: {
      main: "#c88a4a",
      contrastText: "#3a2416",
    },
  },
  typography: {
    fontFamily: "var(--font-sans)",
    h1: { fontFamily: "var(--font-serif)", letterSpacing: "0.02em" },
    h2: { fontFamily: "var(--font-serif)", letterSpacing: "0.02em" },
    h3: { fontFamily: "var(--font-serif)", letterSpacing: "0.02em" },
    h4: { fontFamily: "var(--font-serif)", letterSpacing: "0.01em" },
    h5: { fontFamily: "var(--font-serif)" },
    h6: { fontFamily: "var(--font-serif)" },
    overline: {
      fontFamily: "var(--font-sans)",
      letterSpacing: "0.25em",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      letterSpacing: "0.08em",
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingInline: "1.75rem",
          paddingBlock: "0.75rem",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "var(--accent)",
            color: "var(--contrast)",
            "&:hover": { backgroundColor: "var(--accent)", opacity: 0.9 },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            borderColor: "var(--accent)",
            color: "var(--accent)",
          },
        },
        {
          props: { variant: "text", color: "primary" },
          style: {
            color: "var(--accent)",
          },
        },
      ],
    },
  },
});
