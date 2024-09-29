import UserContext from "@/context/user/UserContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

export default function Greet() {
  const { session } = useContext(UserContext);
  const getPartOfTheDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };
  return (
    <Box>
      <h1>
        Good {getPartOfTheDay()},<br /> {session?.userName}
      </h1>
    </Box>
  );
}
