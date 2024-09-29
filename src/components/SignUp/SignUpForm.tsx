"use client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import { SOMETHING_WENT_WRONG } from "@/contant";

interface UserInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function SignUpForm() {
  const theme = useTheme();
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userError, setUserError] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validateForm = (userInfo: UserInfo) => {
    const userError = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let valid = true;
    if (!userInfo.name.trim()) {
      userError.name = "Name is required";
      valid = false;
    }
    if (!userInfo.email.trim()) {
      userError.email = "Email is required";
      valid = false;
    }
    if (!userInfo.password.trim()) {
      userError.password = "Password is required";
      valid = false;
    }
    if (!userInfo.confirmPassword.trim()) {
      userError.confirmPassword = "Confirm your password";
      valid = false;
    }
    const emailValid = userInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const passwordValid = userInfo.password.length >= 8;
    if (!emailValid) {
      userError.email = "Invalid email address";
      valid = false;
    }
    if (!passwordValid) {
      userError.password = "Password must be at least 8 characters long";
      valid = false;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      userError.confirmPassword = "Passwords do not match";
      valid = false;
    }
    return { valid, userError };
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    const { userError: errorFromValidation, valid } = validateForm(userInfo);
    if (!valid) {
      setUserError(errorFromValidation);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        }),
      });
      if (response.status === 400) {
        setError("User already exists");
        setLoading(false);
        return;
      }
      if (response.ok) {
        await response.json();
        setSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        router.push("/");
      } else {
        console.error("Error:", response.status, response.statusText);
        throw new Error(SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      console.error(error);
      setError(SOMETHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box p={2} sx={{ width: { xs: "100%", sm: "50%", md: "70%" } }}>
        <List
          sx={{
            p: 0,
            border: "1px solid",
            borderColor: "text.primary",
            boxShadow: `${theme.palette.text.primary} -5px 5px`,
          }}
        >
          <ListItem sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              &#9997; &nbsp;Please fill your details
            </Typography>
          </ListItem>
          <Divider
            aria-hidden="true"
            component="li"
            sx={{ borderColor: "text.primary" }}
          />{" "}
          <ListItem sx={{ paddingTop: 4 }}>
            <TextField
              label="Name"
              required
              name="name"
              fullWidth
              value={userInfo.name}
              error={!!userError.name}
              helperText={userError.name}
              onChange={(e) => {
                setUserError({ ...userError, name: "" });
                setUserInfo({ ...userInfo, name: e.target.value });
              }}
            />
          </ListItem>
          <ListItem sx={{ paddingTop: 4 }}>
            <TextField
              label="Email"
              required
              name="email"
              fullWidth
              value={userInfo.email}
              error={!!userError.email}
              helperText={userError.email}
              onChange={(e) => {
                setUserError({ ...userError, email: "" });
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
            />
          </ListItem>
          <ListItem sx={{ paddingTop: 4 }}>
            <TextField
              name="password"
              required
              label="Password"
              fullWidth
              value={userInfo.password}
              error={!!userError.password}
              helperText={userError.password}
              onChange={(e) => {
                setUserError({ ...userError, password: "" });
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
              type={showPassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </ListItem>
          <ListItem sx={{ py: 4 }}>
            <TextField
              name="confirmPassword"
              required
              label="Confirm Password"
              fullWidth
              value={userInfo.confirmPassword}
              error={!!userError.confirmPassword}
              helperText={userError.confirmPassword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              onChange={(e) => {
                setUserError({ ...userError, confirmPassword: "" });
                setUserInfo({ ...userInfo, confirmPassword: e.target.value });
              }}
              type={showPassword ? "text" : "password"}
            />
          </ListItem>
          <Divider
            aria-hidden="true"
            component="li"
            sx={{ borderColor: "text.primary" }}
          />
          <Collapse in={Boolean(success)}>
            <ListItem>
              <Alert sx={{ width: "100%" }} severity="success">
                Account created successfully. Redirecting to sign in...
              </Alert>
            </ListItem>
            <Divider
              aria-hidden="true"
              component="li"
              sx={{ borderColor: "text.primary" }}
            />
          </Collapse>
          <Collapse in={Boolean(error)}>
            <ListItem>
              <Alert
                sx={{ width: "100%" }}
                onClose={() => setError("")}
                severity="error"
              >
                {error}
              </Alert>
            </ListItem>
            <Divider
              aria-hidden="true"
              component="li"
              sx={{ borderColor: "text.primary" }}
            />
          </Collapse>
          <ListItem sx={{ p: 3 }}>
            <Grid2 container width={"100%"} spacing={2}>
              <Grid2 size={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setUserInfo({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                    setUserError({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Reset
                </Button>
              </Grid2>
              <Grid2 size={6}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading}
                  fullWidth
                  onClick={handleSubmit}
                  sx={{ fontWeight: "bold" }}
                >
                  Confirm
                </LoadingButton>
              </Grid2>
            </Grid2>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
