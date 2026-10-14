const express = require("express");
const app = express();

const honapok = [
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

app.use(express.json());

app.get("/api/honapok", (req, res) => {
  res.json(honapok);
});

app.get("/api/honapok/name", (req, res) => {
  const name = req.params.name;
  const honap = honapok.find((h) => h.name === h);

  if (!honap) {
    return res.status(404).json({ message: "Month not found" });
  }

  res.json(user);
});

app.post("/api/honapok", (req, res) => {
  const newHonap = req.body;
  honapok.push(newHonap);
  res.status(201).json(newHonap);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});