import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Notification from "./components/Notification/Notification"; // Adjust path as needed
import { useEffect, useState } from "react";

function App() {
  const [showNotification, setShowNotification] = useState(true);
  const [messageShow, setMessageShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageShow(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowNotification(false);
  };

  const message =
    "Welcome! This Chat AI application requires you to log in to start chatting. Please note that the application is hosted on a free server (OnRender), so it may take a few seconds to initialize if the server hasn't been in use. Thank you for your understanding!";
  return (
    <main>
      {messageShow && (
        <div
          style={{
            backgroundColor: "#00fffc",
            padding: "10px",
            textAlign: "center",
            color: "#555",
            bottom: "0",
            position: "fixed",
          }}
        >
          <p>
            NOTE! This Chat AI application requires you to log in to start
            chatting. Please note that the application is hosted on a free
            server (OnRender), so it may take a few seconds to initialize if the
            server has not been in use. Thank you for your understanding!
          </p>
        </div>
      )}
      {showNotification && (
        <Notification message={message} onClose={handleClose} />
      )}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
