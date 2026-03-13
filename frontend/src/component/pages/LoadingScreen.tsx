import { Box } from "@mui/material";
import type { ReactElement } from "react";

const LoadingScreen = (): ReactElement => (
  <Box
    sx={{
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: 30,
    }}
  >
    Loading...
  </Box>
);

export default LoadingScreen;
