import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          Built with ❤️ by
          <span>
            <span style={{ color: "red" }} className="nav-link">
              Razak
            </span>
          </span>
        </p>
        <hr />
        <p style={{ textAlign: "center" }}>
          <span>
            <Link
              style={{ color: "red" }}
              className="nav-link"
              to={"https://github.com/razak571"}
            >
              Github
            </Link>
          </span>
          x
          <span>
            <Link
              style={{ color: "red" }}
              className="nav-link"
              to={"https://www.linkedin.com/in/razakattar/"}
            >
              LinkedIN
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
