"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextType {
  email: string;
  setEmail: (email: string) => void;
  // Add more fields here later like name, avatar, etc.
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");

  return (
    <ProfileContext.Provider value={{ email, setEmail }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
