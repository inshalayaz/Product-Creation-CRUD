import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute.mjs";
import pool from "./config/db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(productRoute);

app.listen("3001", () => {
  console.log("Server Running");
});
