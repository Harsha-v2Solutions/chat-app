import { type ReactElement } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import BottomNavigation from "./BottomNavigation";
import Logo from "./Logo";
import Logout from "./Logout";

export default function AppLayout(): ReactElement {
  const { user } = useAuth();
  const username = user?.uniqueId;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box>
        <AppBar
          position="static"
          sx={{
            width: "100%",
            backgroundColor: "white",
            boxShadow: "none",
            borderBottom: 1,
            borderColor: "grey.300",
          }}
          color="transparent"
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="rgb(36, 131, 168) "
            >
              Hello, {username}
            </Typography>
            <Logo />
            <Logout />
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
      <Box
        sx={{
          mt: "auto",
        }}
      >
        <BottomNavigation />
        <Footer />
      </Box>
    </Box>
  );
}
