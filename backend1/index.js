const express = require("express");
const app = express();

app.use(express.json());

let users = [
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

/*app.use("/", express.static("public"));

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

app.get("/api/users/:id", (req, res) => {
  let user = users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).send({ error: "User not found" });
  }
  res.send(user);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

app.put("/api/users/:id", (req, res) => {
    const user = users.find( u => u.id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    users = users.map((u) => (u.id === user.id ? { ...u, ...user } : u));
    res.send(user)
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});