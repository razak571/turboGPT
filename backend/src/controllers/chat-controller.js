import userModel from "../models/user-model.js";
import { configureOpenAI } from "../configs/openai-config.js";
import OpenAI from "openai";

const generateChatCompletion = async (req, res) => {
  const { message } = req.body;
  try {
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found or Token mulfunctioned" });
    }

    // Grab chats of user
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Send all chats with new one to OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAI({
      apiKey: config.apiKey,
      organization: config.organization,
    });

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // console.log('chatResponse ::', chatResponse)
    user.chats.push(chatResponse.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("chat controller :: generateChatCompletion error ::", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { generateChatCompletion };
