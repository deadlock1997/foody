import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FoodLogEntry } from "@/db/foodlog";
import { RecipeDB, TotalConsumptionTodayType } from "@/types/recipes";

// Separate API functions
const fetchRecentLogsAPI = async () => {
  const response = await fetch("/api/food-log/top5");
  return await response.json();
};

const fetchRandomRecipeAPI = async () => {
  const response = await fetch("/api/recipes/getRandom");
  return await response.json();
};

const fetchTotalConsumptionTodayAPI = async () => {
  const response = await fetch("/api/food-log/getTotalConsumptionToday");
  return await response.json();
};

const fetchTotalConsumptionDataAPI = async () => {
  const response = await fetch("/api/food-log/view-all");
  return await response.json();
};

// Async thunk to fetch all data (initial load)
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const [
        recentLogData,
        randomRecipeData,
        totalConsumptionDataToday,
        totalConsumptionData,
      ] = await Promise.all([
        fetchRecentLogsAPI(),
        fetchRandomRecipeAPI(),
        fetchTotalConsumptionTodayAPI(),
        fetchTotalConsumptionDataAPI(),
      ]);

      return {
        recentLogData,
        randomRecipeData,
        totalConsumptionDataToday,
        totalConsumptionData,
      };
    } catch (err) {
      return rejectWithValue("Error fetching dashboard data");
    }
  }
);

// Async thunks for individual API calls
export const fetchRecentLogs = createAsyncThunk(
  "dashboard/fetchRecentLogs",
  async (_, { rejectWithValue }) => {
    try {
      const recentLogData = await fetchRecentLogsAPI();
      return recentLogData;
    } catch (err) {
      return rejectWithValue("Error fetching recent logs");
    }
  }
);

export const fetchRandomRecipe = createAsyncThunk(
  "dashboard/fetchRandomRecipe",
  async (_, { rejectWithValue }) => {
    try {
      const randomRecipeData = await fetchRandomRecipeAPI();
      return randomRecipeData;
    } catch (err) {
      return rejectWithValue("Error fetching random recipe");
    }
  }
);

export const fetchTotalConsumptionToday = createAsyncThunk(
  "dashboard/fetchTotalConsumptionToday",
  async (_, { rejectWithValue }) => {
    try {
      const totalConsumptionData = await fetchTotalConsumptionTodayAPI();
      return totalConsumptionData;
    } catch (err) {
      return rejectWithValue("Error fetching total consumption today");
    }
  }
);

export const fetchTotalConsumptionData = createAsyncThunk(
  "dashboard/fetchTotalConsumptionData",
  async (_, { rejectWithValue }) => {
    try {
      const totalConsumptionData = await fetchTotalConsumptionDataAPI();
      return totalConsumptionData;
    } catch (err) {
      return rejectWithValue("Error fetching total consumption data");
    }
  }
);

// Dashboard state interface
interface DashboardState {
  topPickRecipe: RecipeDB | null;
  recentLogResponse: FoodLogEntry[];
  totalConsumptionTodayResponse: TotalConsumptionTodayType | null;
  totalConsumptionResponse: FoodLogEntry[];
  loading: boolean;
  error: string | null;
}

// Initial state for the dashboard
const initialDashboardState: DashboardState = {
  topPickRecipe: null,
  recentLogResponse: [],
  totalConsumptionTodayResponse: null,
  totalConsumptionResponse: [],
  loading: true,
  error: null,
};

// Create the dashboard slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.recentLogResponse = action.payload.recentLogData;
        state.topPickRecipe = action.payload.randomRecipeData;
        state.totalConsumptionResponse = action.payload.totalConsumptionData;
        state.totalConsumptionTodayResponse =
          action.payload.totalConsumptionDataToday;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchRecentLogs.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchRecentLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.recentLogResponse = action.payload;
      })
      .addCase(fetchRecentLogs.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // For fetchRandomRecipe (separate API call)
      .addCase(fetchRandomRecipe.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchRandomRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.topPickRecipe = action.payload;
      })
      .addCase(fetchRandomRecipe.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // For fetchTotalConsumption (separate API call)
      .addCase(fetchTotalConsumptionToday.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTotalConsumptionToday.fulfilled, (state, action) => {
        state.loading = false;
        state.totalConsumptionTodayResponse = action.payload;
      })
      .addCase(fetchTotalConsumptionToday.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // For fetchTotalConsumption (separate API call)
      .addCase(fetchTotalConsumptionData.pending, (state) => {
        state.error = null;
      })
        .addCase(fetchTotalConsumptionData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalConsumptionResponse = action.payload;
      })
      .addCase(fetchTotalConsumptionData.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export the reducer for store configuration
export default dashboardSlice.reducer;
