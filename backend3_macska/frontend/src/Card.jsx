export default function Card({name, country, description, kepUrl}){
    return(
        <div className="card">
            <img src={kepUrl} alt="Кот" />
            <h2>{name}</h2>
            <h3>Ország: {country}</h3>
            <p>{description}</p>
        </div>
    )
}