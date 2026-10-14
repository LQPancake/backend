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
    res.json(user);
  });
});

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
  const id = req.params.id;
  db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [req.body.name ?? null, req.body.email ?? null, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ ...req.body, id: Number(id) });
    }
  );
});

  app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    db.run("DELETE FROM users WHERE id = ?", [userId], function (err){
      if (err) {
        res.status(500).send ({message: "Hiba történt a felhasználó törlésekor"})
      } else if (this.changes === 0) {
        res.send({ message: "Felhasználó sikeresen törölve"});
      } else {
      res.sendStatus(204);
      }
    })
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
