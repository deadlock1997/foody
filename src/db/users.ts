import { logInfo, logError, logWarn } from "@/server-utils/logger";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserDB {
  static users: User[] = [
    {
      id: "cjasdh-kjashd-kjashd-kjashd-kjashd",
      name: "Manidhar Sunkara",
      email: "admin",
      password: "admin",
    },
  ];

  static checkAlreadyExist = (email: string) => {
    const userExists = UserDB.users.find(({ email: presentEmail }) => presentEmail === email);
    if (userExists) {
      logWarn("Attempt to register with an existing email", { email });
      return true;
    }
    return false;
  };

  static addUser = (user: User) => {
    try {
      UserDB.users.push(user);
      logInfo("User added successfully", { userId: user.id, email: user.email });
    } catch (error) {
      logError("Error adding user", error);
    }
  };
}