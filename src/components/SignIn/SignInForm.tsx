"use client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Alert,
  Box,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import UserContext from "@/context/user/UserContext";
import { SOMETHING_WENT_WRONG } from "@/contant";
import {
  formContainer,
  formList,
  listItemSx,
  dividerSx,
  textFieldSx,
  loadingButtonSx,
} from "./SignInForm.styles";

export default function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { setSession } = useContext(UserContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validateForm = (email: string, password: string) => {
    const emailValid = email.trim() !== "";
    const passwordValid = password.trim() !== "";
    return { emailValid, passwordValid, valid: emailValid && passwordValid };
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { emailValid, passwordValid, valid } = validateForm(email, password);
    if (!valid) {
      setEmailError(!emailValid);
      setPasswordError(!passwordValid);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        setError("Invalid credentials");
        return;
      }

      if (response.ok) {
        const session = await response.json();
        setSession(session);
        router.push("/dashboard");
      } else {
        throw new Error(SOMETHING_WENT_WRONG);
      }
    } catch {
      setError(SOMETHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={formContainer}>
      <Box sx={formList}>
        <List sx={listItemSx}>
          <ListItem sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              &#128274; &nbsp;Enter your credentials
            </Typography>
          </ListItem>
          <Divider aria-hidden="true" component="li" sx={dividerSx} />
          <ListItem sx={{ paddingTop: 4 }}>
            <TextField
              label="Email"
              required
              fullWidth
              value={email}
              slotProps={{htmlInput: {maxLength: 50}}}
              error={emailError}
              helperText={emailError ? "Please enter email" : null}
              onChange={(e) => {
                setEmailError(false);
                setEmail(e.target.value);
              }}
              sx={textFieldSx}
            />
          </ListItem>
          <ListItem sx={{ paddingBottom: 4 }}>
            <TextField
              label="Password"
              required
              fullWidth
              value={password}
              error={passwordError}
              slotProps={{htmlInput: {maxLength: 50}}}
              helperText={passwordError ? "Please enter password" : null}
              onChange={(e) => {
                setPasswordError(false);
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <Divider aria-hidden="true" component="li" sx={dividerSx} />
          <Collapse in={Boolean(error)}>
            <ListItem>
              <Alert
                severity="error"
                sx={{ width: "100%" }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            </ListItem>
            <Divider aria-hidden="true" component="li" sx={dividerSx} />
          </Collapse>
          <ListItem sx={{ p: 3 }}>
            <LoadingButton
              loading={loading}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={loadingButtonSx}
            >
              Sign In
            </LoadingButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
