import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import SignUpForm from "./SignUpForm";
export default function SignUp() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography component={"p"}>
          {" "}
          <Typography
            component="span"
            fontSize={{ xs: "1rem", sm: "1.75rem", md: "2.5rem" }}
          >
            Seems like&nbsp;
          </Typography>
          <Typography
            component="span"
            fontSize={{ xs: "1.5rem", sm: "2.5rem", md: "3.5rem" }}
            className="your-food"
          >
            you'r new&nbsp;
          </Typography>
          <Typography
            component="span"
            fontSize={{ xs: "1rem", sm: "1.75rem", md: "2.5em" }}
          >
            . Create an account to get started.
          </Typography>
        </Typography>
      </Box>
      <Grid2
        container
        sx={{ alignItems: "center", justifyContent: "space-evenly" }}
      >
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block" }, justifyItems: "end" }}
        >
          <img
            src={"/images/hand-drawn-thai-2-food-illustration.png"}
            width={"90%"}
            height={"90%"}
            alt="Picture of the author"
          />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{ height: { xs: "auto", md: "100%" } }}
        >
          <SignUpForm />
        </Grid2>
      </Grid2>
    </Box>
  );
}
