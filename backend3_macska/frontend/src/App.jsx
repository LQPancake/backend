import { useEffect, useState } from "react";
import Card from "./Card.jsx";

function App(){
let [cats, setCats] = useState([])
useEffect(() =>{
    fetch("http://localhost:3000/api/cats")
    .then(res => res.json())
    .then(res => setCats(res))
}, [])

return (
  <>
  <h1>Macskák</h1>
  <div className="container">
    {cats.map(cat => {
      return <Card key={cat.id} name={cat.name} country={cat.country} description={cat.description} kepUrl={cat.kepUrl} />
    })}
  </div>
  </>
)
}

export default App;