import express from "express";

import pool from "../config/db.js";

import bodyParser from "body-parser";
import bcrypt from "bcrypt";
// import session from "express-session";
// import cookieParser from "cookie-parser";

const app = express();

// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 24 * 60 * 60 * 1000,
//     },
//   })
// );

const router = new express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "Select * from users where email = ($1)",
    [email],
    (err, result) => {
      if (err) res.send({ err: err });

      if (result.rows.length > 0) {
        bcrypt.compare(password, result.rows[0].password, (err, resp) => {
          if (resp) {
            res.send(result);
          } else {
            res.send({ message: "Wrong Email Or Password" });
          }
        });
      } else {
        res.send({ message: "User Dosen't exist" });
      }
    }
  );
});

export default router;
