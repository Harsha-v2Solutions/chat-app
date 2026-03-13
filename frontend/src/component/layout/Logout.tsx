import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/userAuth";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import { socket } from "../../socket";

export default function Logout(): ReactElement {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      const userId = user?.uniqueId;
      if (userId !== undefined) {
        socket.emit("user_logout", userId);
      }
      await logoutUser();
      setUser(null);
      await navigate("/login", { replace: true });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Logout failed:", err);
    }
  };
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    void handleLogout();
  };
  return (
    <Button
      onClick={handleClick}
      color="error"
      variant="contained"
      sx={{ fontWeight: "bold" }}
    >
      Logout
    </Button>
  );
}
