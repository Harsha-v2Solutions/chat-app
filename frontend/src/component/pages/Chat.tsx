import { Box } from "@mui/material";
import { useState, type ReactElement } from "react";
import ListUsers from "./ListUsers";
import ChatRoom from "./ChatRoom";
import Welcome from "./Welcome";

export default function Chat(): ReactElement {
  const [userToChat, setUserToChat] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <ListUsers setUserToChat={setUserToChat} />
      </Box>
      <Box
        sx={{
          flex: 5,
        }}
      >
        {userToChat ? (
          <ChatRoom key={userToChat} userToChat={userToChat} />
        ) : (
          <Welcome />
        )}
      </Box>
    </Box>
  );
}
