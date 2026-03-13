import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  Stack,
  Link,
  FormControlLabel,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { useState, type ReactElement } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/userAuth";
import { CustomButton, StyledBox } from "../../style/theme";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { socket } from "../../socket";

const loginSchema = z.object({
  username: z.email("Incorrect email address format."),
  password: z.string().min(8, { message: "Minimum 8 characters required" }),
});

type FormData = z.infer<typeof loginSchema>;

function LoginPage(): ReactElement {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (formState: FormData) => {
    try {
      const output = await loginUser(formState.username, formState.password);
      if (typeof output === "string") {
        setError(output);
      } else {
        setUser(output);
        await navigate("/chat-room", { replace: true });
        socket.connect();
      }
    } catch {
      setUser(null);
      setError("Unexpected Error, Please try again later");
    }
  };

  return (
    <>
      <StyledBox onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <Stack spacing={3}>
          <Box className="form-head">
            <Typography variant="title" component="h3">
              Welcome Back
            </Typography>
            <Typography variant="contentMain" component="p">
              Enter your credentials to access your account.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box>
            <Typography
              variant="formLabel"
              component="label"
              htmlFor="username-input"
            >
              Email
            </Typography>
            <TextField
              id="username-input"
              placeholder="Enter email address"
              type="email"
              {...register("username")}
              margin="none"
              fullWidth
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              size="small"
            />
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="formLabel"
                component="label"
                htmlFor="password-input"
              >
                Password
              </Typography>
              <Link
                href="forgot-password"
                underline="none"
                sx={{ color: "rgb(36, 131, 168) " }}
              >
                Forgot password?
              </Link>
            </Box>

            <TextField
              id="password-input"
              placeholder="password"
              {...register("password")}
              type="password"
              margin="none"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              size="small"
            />
          </Box>

          <FormControlLabel
            control={
              <Radio
                sx={{
                  color: "gray",
                }}
              />
            }
            label="Remember me for 30 days"
            sx={{
              color: "gray",
            }}
          />

          <CustomButton variant="contained" type="submit">
            Login
          </CustomButton>

          <Typography variant="contentMain" component="p">
            Don&apos;t have an account?
            <Link
              href="register"
              underline="none"
              sx={{
                color: "rgb(36, 131, 168) ",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
      </StyledBox>
    </>
  );
}

export default LoginPage;
