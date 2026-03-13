import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, type ReactElement } from "react";
import getAllUser from "../../services/getAllUser";
import type { User } from "../../types/userTypes";
import { useAuth } from "../../context/AuthContext";
import { socket } from "../../socket";

export default function ListUsers({
  setUserToChat,
}: {
  setUserToChat: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement {
  const { user } = useAuth();
  const { data = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(),
  });
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (user?.uniqueId !== undefined) {
      socket.emit("new-user-add", user.uniqueId);
    }
    const handleGetUsers = (users: string[]): void => {
      setOnlineUsers([...users]);
    };
    socket.on("get-users", handleGetUsers);
    return (): void => {
      socket.off("get-users", handleGetUsers);
    };
  }, [user?.id, user?.uniqueId]);

  const handleUserClick = (row: User): void => {
    if (!user) return;
    if (onlineUsers.includes(row.uniqueId)) {
      setUserToChat(row.uniqueId);
    }
    socket.emit("private-room", {
      sender: user.uniqueId,
      recipent: row.uniqueId,
    });
  };

  return (
    <Paper variant="outlined" sx={{ height: "100%" }}>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          fontWeight: 550,
          borderBottom: 1,
          fontSize: 25,
          letterSpacing: 1,
          paddingY: 0.8,
        }}
      >
        Users
      </Typography>
      <List disablePadding>
        {data
          .filter((row: User) => row.id !== user?.id)
          .map((row: User) => {
            const isOnline = onlineUsers.includes(row.uniqueId);
            return (
              <ListItem key={row.uniqueId} disablePadding>
                <ListItemButton
                  disabled={!isOnline}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    "&:active, &:focus": { backgroundColor: "gray" },
                  }}
                  onClick={() => {
                    handleUserClick(row);
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontSize: "1.1rem" }}
                          >
                            {row.uniqueId}
                          </Typography>
                          <Chip
                            label={isOnline ? "online" : "offline"}
                            color={isOnline ? "success" : "default"}
                            variant={isOnline ? "filled" : "outlined"}
                            size="small"
                          />
                        </Box>
                      }
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
}
