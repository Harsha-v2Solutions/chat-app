import type { ReactElement } from "react";
import Header from "./header";
import { Box } from "@mui/material";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Layout(): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />

      <Box
        component="main"
        flex={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
