import { AppBar, Box, Link, Toolbar } from "@mui/material";
import type { ReactElement } from "react";
import Logo from "./Logo";

export default function Header(): ReactElement {
  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: 1,
        borderColor: "grey.300",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mx: 10,
        }}
      >
        <Logo />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 5,
          }}
        >
          <Link
            href="/login"
            underline="none"
            sx={{
              color: "gray",
            }}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            underline="none"
            sx={{
              color: "gray",
            }}
          >
            Sign up
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
