import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import Chatitem from "../components/chat/Chatitem";
import { IoMdSend } from "react-icons/io";
import {
  deleteChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteChats();
      setChatMessages([]);
      toast.success("Chats Deleted Successfully", { id: "deletechats" });
    } catch (error) {
      console.log("Error Deleting Chats ::", error);
      toast.error("Chats DEleteing Failde", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          if (data.chats.length === 0) {
           return toast.success("No chats available, Start Conversation", {
              id: "loadchats",
            });
          }
          toast.success("Chats loaded succussfully", { id: "loadchats" });
        })
        .catch((error) => {
          console.log("Error loading chats ::", error);
          toast.error("Loading Chats Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      toast.error("Redirected to login page");
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "65vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            mt: 2,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information.{" "}
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <Chatitem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              //   padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
              padding: "30px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ mx: 1, color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
