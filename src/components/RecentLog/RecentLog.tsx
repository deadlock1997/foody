"use client";
import { FoodLogEntry } from "@/db/foodlog";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardCard from "../Common/DashboardCard/DashboardCard";
import { numberNormalize } from "@/utils/common.functions";
import MinimalSkeletonLoader from "../Loader/SkeletonLoader";
import { tableHeadCellStyle, tableCellStyle, tableFooterStyle } from "./RecentLog.styles";

export interface RecentLogProps {
  top5Recipes: FoodLogEntry[];
}

export default function RecentLog({ top5Recipes }: RecentLogProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <MinimalSkeletonLoader />;
  }

  return (
    <DashboardCard
      title={"Recent Consumptions"}
      titleDividerColor={"white"}
      childBorderColor={"text.primary"}
      titleBgColor={"primary.main"}
      titleBorder={"primary.main"}
      titleColor={"white"}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableHeadCellStyle}>Recipe Name</TableCell>
            <TableCell sx={tableHeadCellStyle}>Calories (kCal)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {top5Recipes.map((recipe) => (
            <TableRow key={recipe.recipeName}>
              <TableCell sx={tableCellStyle}>{recipe.recipeName}</TableCell>
              <TableCell sx={tableCellStyle}>
                {numberNormalize(Number(recipe.calories))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} sx={tableFooterStyle}>
              <Link href="/view-log">View All</Link>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </DashboardCard>
  );
}