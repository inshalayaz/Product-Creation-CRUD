import express from "express";

import pool from "../config/db.js";
import bcrypt from "bcrypt";

import bodyParser from "body-parser";

const router = new express.Router();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

router.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (password.length < 6) {
    res.send({ err: "Password should be at least 6 characters long" });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      pool.query(
        "select * from users where email = ($1)",
        [email],
        (err, result) => {
          if (!result[0]) {
            pool.query(
              "select * from users where username = ($1)",
              [username],
              (err, result) => {
                if (!result[0]) {
                  pool.query(
                    "insert into users (username,email,password) values($1,$2,$3)",
                    [username, email, hash],
                    (err, result) => {
                      if (err) res.send({ err: err });

                      res.send(result);
                    }
                  );
                } else {
                  res.send({ err: "Username Already Taken" });
                }
              }
            );
          } else {
            res.send({ err: "Email Already Registered" });
          }
        }
      );
    });
  }
});

export default router;
