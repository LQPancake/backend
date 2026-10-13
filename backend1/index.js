const express = require("express");
const app = express();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

app.use(express.json());

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  })});

  app.post("/api/users", (req, res) => {
    db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [req.body.name, req.body.email],
      function (err) {
        if (err) {
          res
            .status(500)
            .send({ message: "Hiba történt a felhasználó létrehozásakor" });
        } else {
          const newUser = {
            id: this.lastID,
            name: req.body.name,
            email: req.body.email,
          };
          res.status(201).send(newUser);
        }
      },
    );
  });

  app.put("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    users = users.map((u) => (u.id === user.id ? { ...u, ...user } : u));
    res.send(user);
  });

  app.delete("/api/users/:id", (req, res) => {
    const userIndex = users.findIndex((u) => u.id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).send({ message: "Felhasználó nem található" });
    }
    const deletedUser = users.splice(userIndex, 1);
    res.send(deletedUser[0]);
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
