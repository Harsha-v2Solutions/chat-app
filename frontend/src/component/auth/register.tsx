import { useState, type JSX } from "react";
import {
  Alert,
  Box,
  FormControlLabel,
  InputAdornment,
  Link,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { registerUser } from "../../services/userAuth";
import { CustomButton, StyledBox } from "../../style/theme";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validationSchema = z
  .object({
    email: z.email().min(1, { message: "Email cannot be empty" }),
    firstName: z.string().min(1, { message: "First name cannot be empty" }),
    lastName: z.string().min(1, { message: "Last name cannot be empty" }),
    uniqueId: z.string().min(1, { message: "Can't be empty" }),
    password: z.string().min(8, { message: "Minimum 8 characters required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type InputData = z.infer<typeof validationSchema>;

type ErrFields = InputData;

function Register(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InputData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      uniqueId: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [apiResponse, setApiResponse] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onSubmit = async (data: InputData): Promise<void> => {
    try {
      const validationErrors = {
        email: "",
        firstName: "",
        lastName: "",
        uniqueId: "",
        password: "",
        confirmPassword: "",
      };
      const res = await registerUser(
        data.email,
        data.firstName,
        data.lastName,
        data.uniqueId,
        data.password,
      );

      if (res.status === 200) {
        toast.success("User registration success");
        void navigate("/login", { replace: true });
      } else if (res.status !== 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        res.data.errors?.forEach(
          (err: { field: keyof typeof validationErrors; message: string }) => {
            validationErrors[err.field] =
              (validationErrors[err.field] || "") + err.message + "\n";

            setError(err.field as unknown as ErrFields, {
              type: "server",
              message: validationErrors[err.field],
            });
          },
        );
      } else {
        setApiResponse({
          open: true,
          message: "Server busy please try again later.",
          severity: "error",
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setApiResponse({
        open: true,
        message: "Unexpected error occurred. Try again later.",
        severity: "error",
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    void handleSubmit(onSubmit)(e);
  };

  return (
    <>
      <StyledBox sx={{ width: "90%" }} onSubmit={handleFormSubmit}>
        <Stack spacing={3}>
          <Box className="form-head">
            <Typography variant="title" component="h3">
              Create an account
            </Typography>
            <Typography variant="contentMain" component="p">
              Start your journey with us today
            </Typography>
          </Box>
          {apiResponse.severity && (
            <Alert
              severity={apiResponse.severity as "success" | "error" | "info"}
              sx={{
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {apiResponse.message}
            </Alert>
          )}

          <Box display={"flex"}>
            <Box marginRight={"5px"}>
              <Typography variant="formLabel" component="label">
                First Name
              </Typography>
              <TextField
                {...register("firstName")}
                placeholder="Enter first name"
                type="text"
                margin="none"
                fullWidth
                error={!!errors.firstName}
                helperText={
                  <span style={{ whiteSpace: "pre-line" }}>
                    {errors.firstName?.message}
                  </span>
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                size="small"
              />
            </Box>

            <Box marginLeft={"5px"}>
              <Typography variant="formLabel" component="label">
                Last Name
              </Typography>
              <TextField
                {...register("lastName")}
                placeholder="Enter last name"
                type="text"
                margin="none"
                fullWidth
                error={!!errors.lastName}
                helperText={
                  <span style={{ whiteSpace: "pre-line" }}>
                    {errors.lastName?.message}
                  </span>
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography variant="formLabel" component="label">
                Email
              </Typography>
            </Box>
            <TextField
              {...register("email")}
              type="email"
              margin="none"
              placeholder="Enter email address"
              fullWidth
              error={!!errors.email}
              helperText={
                <span style={{ whiteSpace: "pre-line" }}>
                  {errors.email?.message}
                </span>
              }
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
            <Box>
              <Typography variant="formLabel" component="label">
                unique Id
              </Typography>
            </Box>
            <TextField
              {...register("uniqueId")}
              type="text"
              margin="none"
              placeholder="Enter unique Id"
              fullWidth
              error={!!errors.uniqueId}
              helperText={
                <span style={{ whiteSpace: "pre-line" }}>
                  {errors.uniqueId?.message}
                </span>
              }
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
            <Box>
              <Typography variant="formLabel" component="label">
                Password
              </Typography>
            </Box>
            <TextField
              {...register("password")}
              placeholder="Enter password"
              type="password"
              margin="none"
              fullWidth
              error={!!errors.password}
              helperText={
                <span style={{ whiteSpace: "pre-line" }}>
                  {errors.password?.message}
                </span>
              }
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

          <Box>
            <Box>
              <Typography variant="formLabel" component="label">
                Confirm password
              </Typography>
            </Box>
            <TextField
              {...register("confirmPassword")}
              placeholder="Re-enter password"
              type="password"
              margin="none"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={
                <span style={{ whiteSpace: "pre-line" }}>
                  {errors.confirmPassword?.message}
                </span>
              }
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
            label="I agree to Terms of services and Privacy policy"
            sx={{
              color: "gray",
            }}
          />
          <CustomButton variant="contained" type="submit">
            Create account
          </CustomButton>
          <Typography variant="contentMain" component="p">
            Already have an account?
            <Link
              href="login"
              underline="none"
              sx={{
                color: "rgb(11, 131, 91) ",
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Stack>
      </StyledBox>
    </>
  );
}

export default Register;
