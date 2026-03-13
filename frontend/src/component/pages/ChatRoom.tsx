import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { type ReactElement, useRef, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../../socket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/AuthContext";

interface MessageFormat {
  text: string;
  roomId: string;
  senderId: string;
}

type VoidFunction = () => void;

export default function ChatRoom({
  userToChat,
}: {
  userToChat: string;
}): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageFormat[]>([]);
  const { user } = useAuth();

  useEffect((): VoidFunction | undefined => {
    if (!user) return;
    const handleHistory = (history: MessageFormat[]): void => {
      setMessages(history);
    };
    const handleMessage = (data: MessageFormat): void => {
      const currentRoomId = [user.uniqueId, userToChat].sort().join("-");
      if (data.roomId === currentRoomId) {
        setMessages((prev) => [...prev, data]);
      }
    };
    socket.on("message_history", handleHistory);
    socket.on("message_response", handleMessage);
    return () => {
      socket.off("message_history", handleHistory);
      socket.off("message_response", handleMessage);
    };
  }, [user, userToChat]);

  const clickSend = (): void => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const messageContent: string = inputRef.current.value;
      if (!socket.connected) {
        // eslint-disable-next-line no-console
        console.error("The socket is NOT connected.");
        return;
      }
      const roomId = [user?.uniqueId, userToChat].sort().join("-");
      socket.emit("message", {
        text: messageContent,
        roomId: roomId,
        senderId: user?.uniqueId,
      });
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            height: "51px",
            borderBottom: 1,
            borderColor: "rgb(192, 192, 192)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 550,
              pl: 10,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <AccountCircleIcon fontSize="large" />
            {userToChat}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          {messages.map((msg, index) => {
            const isFromOther = msg.senderId === userToChat;
            return (
              <Box
                key={index}
                sx={{
                  px: 1.5,
                  py: 0.3,
                  maxWidth: "70%",
                  alignSelf: isFromOther ? "flex-start" : "flex-end",
                  bgcolor: isFromOther ? "grey.300" : "rgb(36, 131, 168)",
                  color: isFromOther ? "black" : "white",
                  borderRadius: isFromOther
                    ? "15px 15px 15px 0px"
                    : "15px 15px 0px 15px",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            p: 2,
            backgroundColor: "background.paper",
            borderColor: "divider",
          }}
        >
          <TextField
            fullWidth
            inputRef={inputRef}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                clickSend();
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" color="primary" onClick={clickSend}>
                      <SendIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}
