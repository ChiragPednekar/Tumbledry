"use client";

import React from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function useAuth() {
  const { data: session, status } = useSession();

  const login = (email?: string, password?: string) => {
    // We will handle real login via a dedicated login page or redirect to NextAuth sign-in
    signIn();
  };

  const logout = () => {
    signOut();
  };

  return {
    user: session?.user 
      ? { 
          name: session.user.name || "", 
          email: session.user.email || "", 
          avatar: `https://ui-avatars.com/api/?name=${session.user.name || session.user.email}&background=1E88E5&color=fff`,
          role: (session.user as any).role || "USER",
          id: (session.user as any).id
        } 
      : null,
    status,
    login,
    logout,
  };
}
