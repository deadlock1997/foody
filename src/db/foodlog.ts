import { LogFoodServerInput } from "@/types/logFood";
import { SortedLinkedList } from "@/server-utils/FoodLogLinkedList";

export interface FoodLogEntry extends LogFoodServerInput {
  id: string;
}
export class FoodLogDB {
  static foodlog: { [userId: string]: SortedLinkedList } = {
    "cjasdh-kjashd-kjashd-kjashd-kjashd": new SortedLinkedList(),
  };
}

FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({
  id: "123",
  logDate: new Date("2024-09-29").toISOString(),
  calories: 300,
  protein: 15,
  fat: 10,
  recipeId: 21,
  mealType: "Lunch",
  recipeName: '"Fried" Chicken ',
});

FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1234",
  logDate: new Date("2022-01-01").toISOString(),
  calories: 547,
  protein: 20,
  fat: 222,
  recipeId: 4,
  mealType: "Lunch",
  recipeName: 'Spinach Noodle Casserole ',
});

FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1236",
  logDate: new Date("2022-01-01").toISOString(),
  calories: 547,
  protein: 20,
  fat: 222,
  recipeId: 4,
  mealType: "Lunch",
  recipeName: 'Spinach Noodle Casserole ',
});

FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1237",
  logDate: new Date("2024-04-04").toISOString(),
  calories: 111,
  protein: 20,
  fat: 222,
  recipeId: 4,
  mealType: "Lunch",
  recipeName: 'Spinach Noodle Casserole ',
});

FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1238",
  logDate: new Date("2024-07-01").toISOString(),
  calories: 463,
  protein: 20,
  fat: 222,
  recipeId: 159,
  mealType: "Lunch",
  recipeName: 'Oriental Chicken and Cabbage Salad ',
});

FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1239",
  logDate: new Date("2023-12-23").toISOString(),
  calories: 633,
  protein: 20,
  fat: 222,
  recipeId: 161,
  mealType: "Lunch",
  recipeName: 'Cheddar Chicken Tenders with Wilted Spinach ',
});
FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1240",
  logDate: new Date("2024-01-01").toISOString(),
  calories: 20,
  protein: 20,
  fat: 222,
  recipeId: 161,
  mealType: "Lunch",
  recipeName: 'Cheddar Chicken Tenders with Wilted Spinach ',
});
FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1241",
  logDate: new Date("2024-01-01").toISOString(),
  calories: 555,
  protein: 20,
  fat: 222,
  recipeId: 204,
  mealType: "Lunch",
  recipeName: 'Chicken and Sausage Jambalaya ',
});
FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1242",
  logDate: new Date("2023-02-01").toISOString(),
  calories: 450,
  protein: 20,
  fat: 222,
  recipeId: 4,
  mealType: "Lunch",
  recipeName: 'Spinach Noodle Casserole ',
});
FoodLogDB.foodlog["cjasdh-kjashd-kjashd-kjashd-kjashd"].insert({ 
  id: "1243",
  logDate: new Date("2022-01-02").toISOString(),
  calories: 200,
  protein: 20,
  fat: 204,
  recipeId: 204,
  mealType: "Lunch",
  recipeName: 'Chicken and Sausage Jambalaya ',
});

