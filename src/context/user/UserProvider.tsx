"use client";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { SessionType } from "@/types/session";

export const UserProvider = ({
  user,
  children,
}: {
  user: SessionType;
  children: React.ReactNode;
}) => {
  const [retreivedSession, setRetreivedSession] = useState<SessionType>(user);
  useEffect(() => {
    setRetreivedSession(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ session: retreivedSession, setSession: setRetreivedSession }}
    >
      {children}
    </UserContext.Provider>
  );
};
