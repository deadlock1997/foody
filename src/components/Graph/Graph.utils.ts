import { FoodLogEntry } from "@/db/foodlog";

export enum TimeInterval {
  Day = "day",
  Week = "week",
  Month = "month",
  Year = "year",
}

export function getWeekNumber(date: Date): string {
  const currentDate = new Date(date.getTime());
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7));
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((currentDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${currentDate.getFullYear()}-W${weekNo}`;
}

export function aggregateMealLogs(mealLogs: FoodLogEntry[], interval: TimeInterval) {
  const aggregationMap: { [key: string]: { label: string; calories: number; protein: number; fat: number } } = {};

  mealLogs.forEach((log) => {
    const logDate = new Date(log.logDate);
    let key: string;

    switch (interval) {
      case TimeInterval.Day:
        key = logDate.toISOString().split("T")[0];
        break;
      case TimeInterval.Week:
        key = getWeekNumber(logDate);
        break;
      case TimeInterval.Month:
        key = logDate.getFullYear() + "-" + (logDate.getMonth() + 1);
        break;
      case TimeInterval.Year:
        key = logDate.getFullYear().toString();
        break;
    }    
    if (!aggregationMap[key]) {
      aggregationMap[key] = { label: key, calories: 0, protein: 0, fat: 0 };
    }

    aggregationMap[key].calories += Number(log.calories);
    aggregationMap[key].protein += Number(log.protein);
    aggregationMap[key].fat += Number(log.fat);
  });

  return Object.keys(aggregationMap).slice(0,7).map((key) => aggregationMap[key]);
}