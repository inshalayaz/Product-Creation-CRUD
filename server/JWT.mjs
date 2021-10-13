import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const { sign, verify } = jwt;

export const createToken = (user) => {
  const accessToken = sign(
    { email: user.email, id: user.user_id },
    "mySecret",
    {
      expiresIn: "1h",
    }
  );

  return accessToken;
};

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     let decodedData;
//     if (token) {
//       decodedData = verify(token, "mySecret");
//       req.userId = decodedData?.user_id;
//     }
//   } catch (error) {}

//   next();
// };

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    res.send({ message: "Token Needed" });
  } else {
    verify(token, "mySecret", (err, decoded) => {
      // console.log(decoded.id);
      if (err) {
        res.send({ auth: false, message: "Failed to Authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

// export const validateToken = (req, res, next) => {
//   const accessToken = req.cookies["access-token"];
//   console.log(req.cookies["access-token"]);

//   return next();
//   //   //   console.log(req.cookies["access-token"]);
//   //   //   return next();
//   //   if (!accessToken)
//   //     return res.status(400).json({ error: "User not Authenticated!" });

//   //   try {
//   //     const validToken = verify(accessToken, "mySecret");

//   //     if (validToken) {
//   //       req.authenticated = true;
//   //       return next();
//   //     }
//   //   } catch (error) {
//   //     return res.status(400).json({ error });
//   //   }
// };
