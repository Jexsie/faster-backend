import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Cors from "cors";

import creds from "./dbCreds.js";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 8001;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const dbName = process.env.DB_NAME;
const connectionUrl = `mongodb+srv://${username}:${password}@cluster0.gh7ipti.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Middleware
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connectionUrl);

// API endpoint
app.get("/", (req, res) => {
  res.status(200).send("Hello Mother fucker, You did it");
});

app.post("/faster/creds", (req, res) => {
  const dbCredential = req.body;

  creds.create(dbCredential, (err, creds) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(creds);
    }
  });
});

app.get("/faster/creds", (req, res) => {
  creds.find((err, creds) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(creds);
    }
  });
});

// Listener
app.listen(port, () => console.log(`Server listening on localhost: ${port}`));
