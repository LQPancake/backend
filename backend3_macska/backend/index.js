const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors())

let cats = [
    {
        "id": "1",
        "name": "Karthauzi",
        "country": "Franciaország",
        "description": "Közepes méretű macska, tömör, kerekded kinézettel. Öntörvényű és igen kommunikatív.",
        "kepUrl": "img/Karthauzi.jpg"
    },
    {
        "id": "2",
        "name": "Orientális",
        "country": "Nagy Britannia",
        "description": "Hosszú, elegáns fajta. Az extrémitások macskája. Amilyen elegáns, olyan bújós.",
        "kepUrl": "img/Orientalis.jpg"
    },
    {
        "id": "3",
        "name": "Perzsa",
        "country": "Nagy Britannia",
        "description": "Közepes méretű, masszív, erős fajta. A nagy szőr miatt nagyobbnak tűnik méreténél.",
        "kepUrl": "img/Perzsa.jpg"
    },
    {
        "id": "4",
        "name": "Devon rex",
        "country": "Nagy Britannia",
        "description": "Közepes méretű macska. Megjelenése fülei és szemei miatt manószerű. Igazi ugróbajnok.",
        "kepUrl": "img/Devon_Rex.jpg"
    },
    {
        "id": "5",
        "name": "Cymric",
        "country": "USA",
        "description": "Közepes méretű, zömök, kerekded macskafajta. Nagy étvágyú, könnyen elhízik.",
        "kepUrl": "img/Cymric.jpg"
    },
    {
        "id": "6",
        "name": "Himalája",
        "country": "USA",
        "description": "Közepes méretű, masszív és erős csontozatú macska. Nem túl aktív, de nagyon kedves.",
        "kepUrl": "img/Himalaja.jpg"
    },
    {
        "id": "7",
        "name": "Thai",
        "country": "Thaiföld",
        "description": "A thai erősen ragaszkodik az emberekhez, szerető és szerethető fajta, mely kötődik a családhoz.",
        "kepUrl": "img/Thai.jpg"
    }
]

app.get("/api/cats", (req,res)=>{
    res.send(cats)
})

app.get("/api/cats/:id", (req, res) =>{
    const id = req.params.id;
    const cat = cats.find(cat => cat.id == id)
    if(!cat){
        res.status(404).send("Nincs cirnyó!")
    }
    res.send(cat);
})


app.listen(3000, ()=>{
    console.log("app is listening on 3000 port.")
})