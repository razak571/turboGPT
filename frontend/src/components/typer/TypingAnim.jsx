import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat With Your Own AI ",
        1000,
        "Built With OpenAI 🤖 ",
        2000,
        "Your Own Customized ChatGPT 💻 ",
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "60px",
        display: "inline-block",
        color: "white",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
