import { SessionType } from "@/types/session";
import { createContext } from "react";

const UserContext = createContext({session: {} as SessionType, setSession: (session: SessionType) => {}});

export default UserContext;
