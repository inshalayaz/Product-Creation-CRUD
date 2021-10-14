import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute.mjs";
import loginRoute from "./routes/loginRoute.mjs";
import registerRoute from "./routes/registerRoute.mjs";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(registerRoute);
app.use(loginRoute);
app.use(productRoute);

app.listen("3001", () => {
  console.log("Server Running");
});
