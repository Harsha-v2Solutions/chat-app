import { Box, Typography } from "@mui/material";
import { type ReactElement } from "react";

export default function Logo(): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "black",
        }}
      >
        We-Chat
      </Typography>
    </Box>
  );
}
