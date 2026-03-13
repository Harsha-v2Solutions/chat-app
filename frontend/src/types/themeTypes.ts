declare module "@mui/material/styles" {
  interface TypographyVariants {
    contentMain: React.CSSProperties;
    formLabel: React.CSSProperties;
    title: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    contentMain?: React.CSSProperties;
    formLabel?: React.CSSProperties;
    title?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    contentMain: true;
    formLabel: true;
    title: true;
  }
}
