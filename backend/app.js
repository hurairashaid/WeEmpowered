const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database/connect");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const ws = require("ws");
const PORT = 2000;

const authentication_routes = require("./routes/authentication");
// const counsoler_routes = require("./routes/counsoler");
const organization_routes = require("./routes/organization");
const victim_routes = require("./routes/victim");
const counsoler_routes = require("./routes/counsoler");
const Message = require("./models/messages");
app.get("/", (req, res) => {
  res.send("Welcome to WeEmpowered app");
});

//middleware or to set router
app.use(cors());
app.use("/api/authentication", authentication_routes);
// app.use("/api/counsoler", counsoler_routes);
app.use("/api/organization", organization_routes);
app.use("/api/victim", victim_routes);
app.use("/api/counsoler", counsoler_routes);

const start = async () => {
  try {
    await connectDB();
    const server = app.listen(
      2000,
      console.log(`server is running at http://localhost:${PORT}`)
    );
    const wss = new ws.WebSocketServer({ server });
    wss.on("connection", (connection, req) => {
      const url = new URL(req.url, "http://localhost");
      const sessionID = url.searchParams.get("sessionID");
      const userName = url.searchParams.get("name");
      const organizationId = url.searchParams.get("organization");

      // Now you have access to the sessionID
      connection.userId = sessionID;
      connection.userName = userName;
      connection.organizationId = organizationId;

      [...wss.clients].forEach((client) => {
        client.send(
          JSON.stringify({
            online: [...wss.clients].map((c) => ({
              userId: c.userId,
              userName: c.userName,
              organizationId: c.organizationId,
            })),
          })
        );
      });
      connection.on("message", (message, isbinary) => {
        message = JSON.parse(message.toString());
        console.log(message);
        const recipient = message.message.recipient;
        const text = message.message.text;
        const sender = connection.userId;
        console.log(recipient);
        console.log(text);
        Message.create({
          sender: connection.userId,
          recipient: recipient,
          text: text,
        });
        [...wss.clients]
          .filter((c) => c.userId === recipient)
          .forEach((c) => c.send(JSON.stringify({ text, sender, recipient })));
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
