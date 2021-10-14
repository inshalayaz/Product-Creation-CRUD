import express from "express";

import pool from "../config/db.js";

import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { createToken } from "../JWT.mjs";

const app = express();

// app.use(cookieParser());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const router = new express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    pool.query(
      "Select * from users where email = ($1)",
      [email],
      (err, result) => {
        if (err) res.send({ err: err });

        if (result.rows.length > 0) {
          bcrypt.compare(password, result.rows[0].password, (err, resp) => {
            if (resp) {
              const user = result.rows[0];
              const token = createToken(user);
              res.send({ auth: true, result, token });
            } else {
              res.send({ message: "Wrong Email Or Password" });
            }
          });
        } else {
          res.send({ message: "User Dosen't exist" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

// pool.query(
//   "Select * from users where email = ($1)",
//   [email],
//   (err, result) => {
//     if (err) res.send({ err: err });

//     if (result.rows.length > 0) {
//       bcrypt.compare(password, result.rows[0].password, (err, resp) => {
//         if (resp) {
//           // console.log(result.rows[0]);
//           const user = result.rows[0];
//           const accessToken = createToken(user);

//           res.cookie("access-token", accessToken, {
//             maxAge: 60 * 60 * 24 * 30 * 1000,
//           });

//           res.send({ auth: true, token: accessToken, result });
//         } else {
//           res.send({ message: "Wrong Email Or Password" });
//         }
//       });
//     } else {
//       res.send({ message: "User Dosen't exist" });
//     }
//   }
//   );
// });

// router.get("/login", (req, res) => {
//   if (req.cookies["access-token"]) {
//     // console.log(req.cookies["access-token"]);
//     res.send({ loggedIn: true });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

export default router;
