import { FoodLogEntry } from "@/db/foodlog";
import dayjs from "dayjs";

class DataNode {
  data: FoodLogEntry;
  next: DataNode | null;

  constructor(data: FoodLogEntry) {
    this.data = data;
    this.next = null;
  }
}

export class SortedLinkedList {
  head: DataNode | null;

  constructor() {
    this.head = null;
  }
  insert(data: FoodLogEntry): void {
    let newNode = new DataNode(data);
    if (
      this.head === null ||
      dayjs(this.head.data.logDate).unix() <= dayjs(newNode.data.logDate).unix()
    ) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;

      while (
        current.next !== null &&
        dayjs(current.next.data.logDate).unix() >
          dayjs(newNode.data.logDate).unix()
      ) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }
  }

  delete(id: string): void {
    if (this.head === null) {
      throw new Error("List is empty.");
    }

    // Case when the head needs to be deleted
    if (this.head.data.id === id) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    // Traverse the list to find the node before the node to be deleted
    while (current.next !== null && current.next.data.id !== id) {
      current = current.next;
    }

    // If we reached the end of the list and didn't find the node
    if (current.next === null) {
      throw new Error(`Node with id ${id} not found in the list.`);
    }

    // Delete the node by skipping over it
    current.next = current.next.next;
  }

  update(oldId: string, newData: FoodLogEntry): void {
    this.delete(oldId);
    this.insert(newData);
  }

  top5(): FoodLogEntry[] {
    const top5: FoodLogEntry[] = [];
    let current = this.head;
    while (current !== null && top5.length < 5) {
      top5.push(current.data);
      current = current.next;
    }
    return top5;
  }
  getTodaysTotalConsumption(): { calories: number; protein: number; fat: number } {
    let current = this.head;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    const today = dayjs().format("YYYY-MM-DD"); // Precompute today's date once
  
    while (current !== null && dayjs(current.data.logDate).format("YYYY-MM-DD") === today) {
      totalCalories += Number(current.data.calories);
      totalProtein += Number(current.data.protein);
      totalFat += Number(current.data.fat);
      current = current.next;
    }
  
    return { calories: totalCalories, protein: totalProtein, fat: totalFat };
  }

  viewAll(): FoodLogEntry[] {
    const all: FoodLogEntry[] = [];
    let current = this.head;
    while (current !== null) {
      all.push(current.data);
      current = current.next;
    }
    return all;
  }

  // Display the list
  printList(): void {
    let current = this.head;
    let list = "";
    while (current !== null) {
      list += current.data.id + " ";
      current = current.next;
    }
  }
}
