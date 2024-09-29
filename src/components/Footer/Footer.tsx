import { x_padding } from "@/contant";
import { Box, Divider, Typography, Link, Stack } from "@mui/material";
import { footerContainer, footerDivider } from "./Footer.styles";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box role="footer" sx={{ ...footerContainer, px: x_padding, py: 4 }}>
      <Divider aria-hidden="true" sx={footerDivider} />

      {/* Copyright */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mb: 2 }}
      >
        &copy; {currentYear} Foody. All rights reserved.
      </Typography>

      {/* Data & Image Sources */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        {/* Data Sources */}
        <Typography variant="body2" component="span" color="textSecondary">
          Data sources:{" "}
          <Link
            href="https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            Kaggle Food Ingredients Dataset
          </Link>
          ,{" "}
          <Link
            href="https://www.kaggle.com/datasets/hugodarwood/epirecipes"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            EpiRecipes
          </Link>
        </Typography>

        {/* Image Sources */}
        <Typography variant="body2" component="span" color="textSecondary">
          Image sources:{" "}
          <Link
            href="https://www.freepik.com/free-vector/hand-drawn-thai-food-illustration_22870559.htm#fromView=search&page=1&position=16&uuid=ed52d355-a66f-402b-8c62-da45f3dbe584"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            Freepik Thai Food Illustration 1
          </Link>
          ,{" "}
          <Link
            href="https://www.freepik.com/free-vector/hand-drawn-thai-food-illustration_22870543.htm#fromView=search&page=1&position=32&uuid=ed52d355-a66f-402b-8c62-da45f3dbe584"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            Freepik Thai Food Illustration 2
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;