import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationalLink from "./shared/NavigationalLink";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.logout();
    toast.success("Logout succuss, login to chat");
    navigate("/login");
  };

  const loginPage = location.pathname === "/login";
  const signupPage = location.pathname === "/signup";

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationalLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationalLink
                bg="#51538f"
                to="/"
                text="Logout"
                textColor="white"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <NavigationalLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationalLink
                bg="#51538f"
                to="/signup"
                text="Signup"
                textColor="white"
              />
            </>
          )}{" "}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
