import { Box, Typography } from "@mui/material";
import { type ReactElement } from "react";

export default function Chat(): ReactElement {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "550",
          }}
        >
          Welcome
        </Typography>
        <Typography variant="body2">Select user to chat</Typography>
      </Box>
    </>
  );
}
