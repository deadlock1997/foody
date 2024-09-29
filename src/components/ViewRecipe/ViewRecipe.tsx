import { RecipeDB } from "@/types/recipes";
import {
  Container,
  CardContent,
  Typography,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import DashboardCard from "../Common/DashboardCard/DashboardCard";
import { cardBoxStyle, containerStyle, recipeImageStyle } from "./ViewRecipe.styles";

interface ViewRecipeProps {
  recipe: RecipeDB;
}

export default function ViewRecipe(props: ViewRecipeProps) {
  const { recipe } = props;

  return (
    <Container sx={containerStyle}>
      <Box sx={cardBoxStyle}>
        <CardContent>
          <Box
            component="img"
            sx={recipeImageStyle}
            alt="Recipe image"
            src={`/images/recipe/${recipe.id}.jpg`} // You can dynamically insert a recipe image here
          />
          <Typography variant="h4" component="div" gutterBottom>
            {recipe.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {recipe.desc}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Date: {new Date(recipe.date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Box>

      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DashboardCard
            title={"Ingredients"}
            titleDividerColor={"white"}
            childBorderColor={"text.primary"}
            titleBgColor={"secondary.main"}
            titleBorder={"secondary.main"}
            titleColor={"white"}
          >
            <List>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <DashboardCard
            title={"Directions"}
            titleDividerColor={"white"}
            childBorderColor={"text.primary"}
            titleBgColor={"primary.main"}
            titleBorder={"primary.main"}
            titleColor={"white"}
          >
            <List>
              {recipe.directions.map((direction, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${index + 1}. ${direction}`} />
                </ListItem>
              ))}
            </List>
          </DashboardCard>
        </Grid2>
      </Grid2>
    </Container>
  );
}