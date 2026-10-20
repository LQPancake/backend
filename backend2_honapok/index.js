
import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("./database.sqlite");

const honapok = [
    { name: "szeptember", evszak: "osz", photoUrl: "./img/szeptember.jpg", leiras: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "október", evszak: "osz", photoUrl: "./img/oktober.jpg", leiras: "In sodales lobortis venenatis." },
    { name: "november", evszak: "osz", photoUrl: "./img/november.jpg", leiras: "Fusce sodales diam volutpat nulla finibus vulputate." },
    { name: "december", evszak: "tel", photoUrl: "./img/december.jpg", leiras: "Fusce dui enim, consequat ac auctor sit amet, mattis eget odio." },
    { name: "január", evszak: "tel", photoUrl: "./img/januar.jpg", leiras: "Morbi venenatis hendrerit diam, sit amet feugiat nisi convallis eu." },
    { name: "február", evszak: "tel", photoUrl: "./img/februar.jpg", leiras: "Nunc auctor augue nec accumsan lacinia." },
    { name: "március", evszak: "tavasz", photoUrl: "./img/marcius.jpg", leiras: "Pellentesque aliquam luctus eros a tincidunt." },
    { name: "április", evszak: "tavasz", photoUrl: "./img/aprilis.jpg", leiras: "Vivamus dolor turpis, lobortis eu sagittis sit amet, posuere nec justo." },
    { name: "május", evszak: "tavasz", photoUrl: "./img/majus.jpg", leiras: "Sed volutpat tortor sed nunc blandit, vel rutrum erat rhoncus." },
    { name: "június", evszak: "nyar", photoUrl: "./img/junius.jpg", leiras: "Nulla erat enim, lobortis et metus vitae, porttitor pharetra arcu." },
    { name: "július", evszak: "nyar", photoUrl: "./img/julius.jpg", leiras: "Duis in lacus in erat imperdiet euismod vitae et massa." },
    { name: "augusztus", evszak: "nyar", photoUrl: "./img/augusztus.jpg", leiras: "Maecenas quis placerat risus, eu blandit nunc." }
];

app.use(cors());
app.use(express.json());

// Initialize the database
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS honapok (
            name TEXT PRIMARY KEY,
            evszak TEXT,
            photoUrl TEXT,
            leiras TEXT
        )
    `, (err) => {
        if (err) {
            console.error("Table creation error:", err.message);
            return;
        }

        // Insert the default months only if the table is empty.
        db.get("SELECT COUNT(*) AS count FROM honapok", (err, row) => {
            if (err) {
                console.error("Database error:", err.message);
                return;
            }

            if (row.count === 0) {
                const stmt = db.prepare(
                    "INSERT INTO honapok (name, evszak, photoUrl, leiras) VALUES (?, ?, ?, ?)"
                );

                for (const honap of honapok) {
                    stmt.run([
                        honap.name,
                        honap.evszak,
                        honap.photoUrl,
                        honap.leiras
                    ]);
                }

                stmt.finalize();
            }
        });
    });
});

// Get all months
app.get("/api/honapok", (req, res) => {
    db.all("SELECT * FROM honapok", (err, honapok) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json(honapok);
    });
});

// Get one month
app.get("/api/honapok/:name", (req, res) => {
    const name = req.params.name;

    db.get(
        "SELECT * FROM honapok WHERE name = ?",
        [name],
        (err, honap) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (!honap) {
                return res.status(404).json({ message: "Month not found" });
            }

            res.json(honap);
        }
    );
});

// Add a new month
app.post("/api/honapok", (req, res) => {
    const { name, evszak, photoUrl, leiras } = req.body;

    if (!name || !evszak || !photoUrl || !leiras) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    db.run(
        "INSERT INTO honapok (name, evszak, photoUrl, leiras) VALUES (?, ?, ?, ?)",
        [name, evszak, photoUrl, leiras],
        function (err) {
            if (err) {
                const status = err.code === "SQLITE_CONSTRAINT" ? 409 : 500;
                return res.status(status).json({ message: err.message });
            }

            res.status(201).json({ name, evszak, photoUrl, leiras });
        }
    );
});

// Update a month
app.put("/api/honapok/:name", (req, res) => {
    const name = req.params.name;
    const { evszak, photoUrl, leiras } = req.body;
    const newName = req.body.name;

    db.run(
        `UPDATE honapok
         SET name = ?, evszak = ?, photoUrl = ?, leiras = ?
         WHERE name = ?`,
        [newName, evszak, photoUrl, leiras, name],
        function (err) {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Month not found" });
            }

            res.json({ name: newName, evszak, photoUrl, leiras });
        }
    );
});

// Delete a month
app.delete("/api/honapok/:name", (req, res) => {
    const name = req.params.name;

    db.run(
        "DELETE FROM honapok WHERE name = ?",
        [name],
        function (err) {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Month not found" });
            }

            res.sendStatus(204);
        }
    );
});

app.listen(3000, () => {
    console.log("The app is running on port 3000!");
});
