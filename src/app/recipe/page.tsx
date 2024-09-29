"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid2,
  Divider,
  Pagination,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { GetAllRecipesType, RecipeDB } from "@/types/recipes";
import { LoadingButton } from "@mui/lab";
import Loader from "@/components/Loader/Loader";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<RecipeDB[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchRecipesByName = async (
    value: string,
    page: number,
    pageSize: number
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api/recipes/getRecipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchTerm: value,
          page: page,
          limit: pageSize,
        }),
      });
      if (response.ok) {
        const data = (await response.json()) as GetAllRecipesType;
        setRecipes(data.recipes);
        setPagination({
          ...pagination,
          total: data.totalPages,
          page: page,
          currentPage: page,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAllRecipes = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/recipes/getAll?page=${page}&limit=${pageSize}`
      );
      if (response.ok) {
        const data = (await response.json()) as GetAllRecipesType;
        setRecipes(data.recipes);
        setPagination({
          ...pagination,
          total: data.totalPages,
          page,
          currentPage: page,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRecipes(pagination.page, pagination.pageSize);
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Grid2 container spacing={2} justifyContent="center" alignItems="end">
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Search for Recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.length > 0 && !loading) {
                fetchRecipesByName(searchQuery, 1, pagination.pageSize);
              }
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4, md: 2}}>
          <LoadingButton
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              fetchRecipesByName(searchQuery, 1, pagination.pageSize);
            }}
            startIcon={<SearchIcon />}
            disabled={loading}
          >
            Search
          </LoadingButton>
        </Grid2>
      </Grid2>
      <Divider sx={{ my: 2, borderColor: "text.primary" }} />
      {!loading && recipes.length > 0 && (
        <>
          <Pagination
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "center",
              },
              "& .MuiButtonBase-root": {
                border: "1px solid",
                borderColor: "text.primary",
                borderRadius: "0",
              },
            }}
            count={pagination.total}
            page={pagination.currentPage}
            onChange={(event, page) => {
              searchQuery
                ? fetchRecipesByName(searchQuery, page, pagination.pageSize)
                : fetchAllRecipes(page, pagination.pageSize);
            }}
            defaultValue={pagination.currentPage}
          />
          <Divider sx={{ my: 2, borderColor: "text.primary" }} />
          <Grid2 container spacing={4} style={{ marginTop: "20px" }}>
            {recipes.map((recipe) => {
              return (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={recipe.id}>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderColor: "text.primary",
                      border: "1px solid",
                      borderRadius: 0,
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      href={`/recipe/${recipe.id}`}
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        borderRadius: "0",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          marginRight: "8px",
                          textTransform: "initial",
                          color: "#fff",
                        }}
                      >
                        View
                      </Typography>
                      <ArrowForwardIcon fontSize="small" />
                    </Button>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`/images/recipe/${recipe.id}.jpg`}
                      alt={recipe.title}
                    />
                    <CardContent sx={{ px: 3, py: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          lineHeight: "1.5em",
                          maxHeight: "3em",
                        }}
                      >
                        {recipe.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2, // Limits text to 2 lines
                          lineHeight: "1.5em",
                          maxHeight: "3em", // 2 lines * 1.5em line-height = 3em
                        }}
                      >
                        A delicious recipe for {recipe.title}, try it today!
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </>
      )}
      {loading && <Loader />}
      {!loading && recipes.length === 0 && (
        <Typography variant="h6" align="center">
          No recipes found.
        </Typography>
      )}

      <Divider sx={{ my: 2, borderColor: "text.primary" }} />
      <Alert severity="warning">Images shown here may not be accurate.</Alert>
    </Container>
  );
};

export default App;
