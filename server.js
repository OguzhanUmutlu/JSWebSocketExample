const express = require("express");
const WebSocket = require("ws");

let __uuid = 0;

const wss = new WebSocket.WebSocketServer({
    port: 8080
});

wss.on("connection", ws => {
    ws.uuid = __uuid++;
    console.log("A web socket got opened! ID: " + ws.uuid);
    ws.on("error", (err) => {
        console.log("A web socket got error! ID: " + ws.uuid);
        console.log(err);
    });
    ws.on("message", message => {
        message = message.toString();
        console.log("A web socket sent message! ID: " + ws.uuid);
        console.log(message);
    });
    ws.on("close", () => {
        console.log("A web socket closed session! ID: " + ws.uuid);
    });
});

const app = express();

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(3000);