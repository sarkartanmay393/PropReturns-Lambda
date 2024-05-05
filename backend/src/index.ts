import cors from "cors";
import express from "express";
import router from "./routes";
import ConnectDatabase from "./utils/connectDatabase";
import serverless from "serverless-http";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

ConnectDatabase();

export const handler = serverless(app);
