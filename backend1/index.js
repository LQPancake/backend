const express = require("express");
const app = express();

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: "3",
    name: "Sam Johnson",
    email: "sam.johnson@example.com",
  },
];

/*
app.use("/", express.static("public"));

// Endpoints

app.get("/itmp", (req, res) => {
  res.send("Hello ITMP!");
});
app.get("/nodejs", (req, res) => {
  res.send("A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül.");
});
app.get("/express", (req, res) => {
  res.send("Az Express egy minimalista webes keretrendszer, amely a Node.js-hez készült.");
});
*/

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});