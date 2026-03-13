import { useEffect, useState, type ReactElement } from "react";
import { Alert, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard(): ReactElement {
  const navigate = useNavigate();

  const [open, setOpen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("denied") !== null;
  });

  useEffect(() => {
    if (open) {
      void navigate("/dashboard", { replace: true });
    }
  }, [open, navigate]);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          margin: 2,
          textAlign: "center",
        }}
      >
        Welcome to the App
      </Typography>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%", fontWeight: "bold" }}
        >
          You are not authorized to view this page. Please log in with an
          account that has access.
        </Alert>
      </Snackbar>
    </>
  );
}
