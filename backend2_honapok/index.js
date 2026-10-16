const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

let honapok = [
    {
        "name": "szeptember",
        "evszak": "osz",
        "photoUrl": "./img/szeptember.jpg",
        "leiras": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        "name": "október",
        "evszak": "osz",
        "photoUrl": "./img/oktober.jpg",
        "leiras": "In sodales lobortis venenatis."
    },
    {
        "name": "november",
        "evszak": "osz",
        "photoUrl": "./img/november.jpg",
        "leiras": "Fusce sodales diam volutpat nulla finibus vulputate."
    },
    {
        "name": "december",
        "evszak": "tel",
        "photoUrl": "./img/december.jpg",
        "leiras": "Fusce dui enim, consequat ac auctor sit amet, mattis eget odio."
    },
    {
        "name": "január",
        "evszak": "tel",
        "photoUrl": "./img/januar.jpg",
        "leiras": "Morbi venenatis hendrerit diam, sit amet feugiat nisi convallis eu."
    },
    {
        "name": "február",
        "evszak": "tel",
        "photoUrl": "./img/februar.jpg",
        "leiras": "Nunc auctor augue nec accumsan lacinia."
    },
    {
        "name": "március",
        "evszak": "tavasz",
        "photoUrl": "./img/marcius.jpg",
        "leiras": "Pellentesque aliquam luctus eros a tincidunt."
    },
    {
        "name": "április",
        "evszak": "tavasz",
        "photoUrl": "./img/aprilis.jpg",
        "leiras": "Vivamus dolor turpis, lobortis eu sagittis sit amet, posuere nec justo."
    },
    {
        "name": "május",
        "evszak": "tavasz",
        "photoUrl": "./img/majus.jpg",
        "leiras": "Sed volutpat tortor sed nunc blandit, vel rutrum erat rhoncus."
    },
    {
        "name": "június",
        "evszak": "nyar",
        "photoUrl": "./img/junius.jpg",
        "leiras": "Nulla erat enim, lobortis et metus vitae, porttitor pharetra arcu."
    },
    {
        "name": "július",
        "evszak": "nyar",
        "photoUrl": "./img/julius.jpg",
        "leiras": "Duis in lacus in erat imperdiet euismod vitae et massa."
    },
    {
        "name": "augusztus",
        "evszak": "nyar",
        "photoUrl": "./img/augusztus.jpg",
        "leiras": "Maecenas quis placerat risus, eu blandit nunc."
    }
]

// letrehozza az adatbazist
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS honapok");
  db.run(
    "CREATE TABLE honapok (name TEXT, evszak TEXT, photoUrl TEXT, leiras TEXT)");
  for (const i of honapok) {
    db.run("INSERT INTO honapok (name, evszak, photoUrl, Leiras) VALUES (?, ?, ?, ?)", [i.name, i.evszak, i.photoUrl, i.leiras]);
  }
}); 

app.use(express.json());

// kiirja az osszes honapot
app.get("/api/honapok", (req, res) => {
  db.all("SELECT * FROM honapok", (err, honapok) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(honapok);
  });
});

// ki ir 1 honapot
app.get("/api/honapok/:name", (req, res) => {
  const name = req.params.name;
  db.get("SELECT * FROM honapok WHERE name = ?", [name], (err, honap) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!honap) {
      return res.status(404).json({ message: "Month not found" });
    }
    res.json(honap);
  });
});


// hozza ad egy uj honapot
app.post("/api/honapok", (req, res) => {
  db.run(
    "INSERT INTO honapok (name, evszak, photoUrl, leiras) VALUES (?, ?, ?, ?)",
    [req.body.name, req.body.evszak, req.body.photoUrl, req.body.leiras],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ ...req.body, name: this.lastName });
    }
  );
});

// szerkeszt 1 honapot
app.put("/api/honapok/:name", (req, res) => {
  const name = req.params.name;
  db.run(
    "UPDATE honapok SET name = ?, evszak = ?, photoUrl = ?, leiras = ? WHERE name = ?",
    [req.body.name, req.body.evszak, req.body.photoUrl, req.body.leiras, name],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ ...req.body, name: req.params.name});
    }
  );
});

// torol 1 honapot

app.delete("/api/honapok/:name", (req, res) => {
  const name = req.params.name;
  db.run("DELETE FROM honapok WHERE name = ?", [name], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.sendStatus(204);
  });
});
app.listen(3000, () => console.log("The app is running on port 3000!"));