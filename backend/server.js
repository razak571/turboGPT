import "dotenv/config";
import { connectDB, disconnectDB } from "./src/db/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5555;
app.get("/", (req, res) => {
  // res.json({ success: true, message: `Server Running on PORT ${PORT} 😎` })
  res.render("index", { title: "Express Server" });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server started on port ${PORT} 😘`);
  } catch (error) {
    console.log("Error while starting server ::", error);
    await disconnectDB();
  }
});
