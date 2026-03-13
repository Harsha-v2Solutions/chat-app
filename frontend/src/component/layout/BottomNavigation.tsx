import { type ReactElement } from "react";
import {
  Box,
  Button,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  StyledLinkForFooterListItems,
  StyledLinkForSocialIcons,
} from "../../style/theme";

const BottomNavigation = (): ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "auto",
      }}
    >
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          borderTop: 1,
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "95%",
            paddingY: 8,
            marginX: "auto",
          }}
        >
          <Box
            width="30%"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box>
              <Typography fontSize={20} fontWeight={800}>
                ABOUT
              </Typography>
              <Typography lineHeight={2} fontSize={17} color="grey">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                vero commodi voluptatibus sequi quibusdam voluptatem ut qui
                alias reiciendis quasi?
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={20} fontWeight={800}>
                Subscribe
              </Typography>
              <Typography color="grey">
                to stay updated on latest offers and products
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  width: "100%",
                  maxWidth: 400,
                  marginTop: 1,
                }}
              >
                <TextField
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  size="small"
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            sx={{ mr: -1, height: "100%" }}
                          >
                            Subscribe
                          </Button>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box width="15%">
            <Typography fontSize={20} fontWeight={800}>
              INFORMATION
            </Typography>
            <List>
              <ListItem>
                <StyledLinkForFooterListItems>
                  About Us
                </StyledLinkForFooterListItems>
              </ListItem>
              <ListItem>
                <StyledLinkForFooterListItems>
                  Contact Us
                </StyledLinkForFooterListItems>
              </ListItem>
              <ListItem>
                <StyledLinkForFooterListItems>
                  Terms & Conditions
                </StyledLinkForFooterListItems>
              </ListItem>
              <ListItem>
                <StyledLinkForFooterListItems>
                  Private Policy
                </StyledLinkForFooterListItems>
              </ListItem>
            </List>
          </Box>
          <Box width="15%">
            <Typography fontSize={20} fontWeight={800}>
              CONTACT US
            </Typography>
            <Typography marginY={2} color="grey">
              XYZ, Bengaluru, India <br /> Pin Code - 560094
            </Typography>
            <Typography color="grey">+91-1234567890</Typography>
            <Box sx={{ display: "flex", gap: 1.5, marginY: 2 }}>
              <StyledLinkForSocialIcons>
                <InstagramIcon
                  sx={{ fontSize: "2rem", color: "rgb(189, 58, 189)" }}
                />
              </StyledLinkForSocialIcons>
              <StyledLinkForSocialIcons>
                <FacebookIcon sx={{ fontSize: "2rem", color: "blue" }} />
              </StyledLinkForSocialIcons>
              <StyledLinkForSocialIcons>
                <XIcon sx={{ fontSize: "1.7rem", color: "black" }} />
              </StyledLinkForSocialIcons>
              <StyledLinkForSocialIcons>
                <YouTubeIcon sx={{ fontSize: "2rem", color: "red" }} />
              </StyledLinkForSocialIcons>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomNavigation;
