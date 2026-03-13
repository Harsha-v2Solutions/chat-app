import { Button, createTheme, styled } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
    title: {
      fontWeight: "bold",
      fontSize: 25,
      color: "black",
    },
    contentMain: {
      color: "gray",
    },
    formLabel: {
      textAlign: "left",
      display: "block",
      fontWeight: "bold",
      color: "black",
      marginBottom: 1,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
  },
});

const CustomButton = styled(Button)({
  borderRadius: 10,
  backgroundColor: "teal",
});

const StyledBox = styled("form")({
  width: 400,
  height: "auto",
  textAlign: "center",
});

const StyledLinkForFooterListItems = styled("a")({
  cursor: "pointer",
  textDecoration: "none",
  color: "grey",
});

const StyledLinkForSocialIcons = styled("a")({
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
    transition: "transform 0.2s ease-in-out",
  },
});

export {
  theme,
  StyledBox,
  CustomButton,
  StyledLinkForFooterListItems,
  StyledLinkForSocialIcons,
};
