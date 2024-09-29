import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import SignInForm from "./SignInForm";
import {
  container,
  headline_fredoka,
  headline_your_food,
  sign_in_grid,
  sign_in_grid_size,
  sign_in_image,
  sign_in_image_grid,
  text_align_center,
} from "./SignIn.styles";
export default function SignIn() {
  return (
    <Box sx={container}>
      <Box sx={text_align_center}>
        <Typography component={"p"}>
          {" "}
          <Typography component="span" fontSize={headline_fredoka}>
            Let’s get your&nbsp;
          </Typography>
          <Typography
            component="span"
            fontSize={headline_your_food}
            className="your-food"
          >
            food journey&nbsp;
          </Typography>
          <Typography component="span" fontSize={headline_fredoka}>
            started. Shall we!
          </Typography>
        </Typography>
      </Box>
      <Grid2 container sx={sign_in_grid}>
        <Grid2 size={sign_in_grid_size} sx={sign_in_grid}>
          <SignInForm />
        </Grid2>
        <Grid2 size={sign_in_grid_size} sx={sign_in_image_grid}>
          <img
            src={"/images/hand-drawn-thai-food-illustration.png"}
            style={sign_in_image}
            alt="Picture of the author"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
