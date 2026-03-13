import { useState, useEffect, type ReactNode, type ReactElement } from "react";
import type { User } from "../types/userTypes";
import { AuthContext } from "./AuthContext";
import { verifySession } from "../services/userAuth";
import { socket } from "../socket";

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const output = await verifySession();
        setUser(output);
        if (output !== null) socket.connect();
      } finally {
        setIsLoading(false);
      }
    };
    void checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
