import { Box, Container, Typography } from "@mui/material";
import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: "auto",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        borderTop: 1,
        borderColor: "grey.300",
      }}
    >
      <Container>
        <Typography variant="contentMain" component="p">
          &copy; 2026 We-Chat. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
