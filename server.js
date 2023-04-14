const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/lt", require("./routes/translateToLtRoute"));
app.use("/api/it", require("./routes/translateToItRoute"));

if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => res.send("The backend is running"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
