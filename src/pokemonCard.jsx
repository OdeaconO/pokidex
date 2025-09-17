import { Link } from "react-router-dom";

export default function PokemonCard({ name, number, id }) {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
  return (
    <Link to={`/pokemon/${id}`} className="list-item">
      <div className="number-wrap">#{String(number).padStart(3, "0")}</div>
      <div className="img-wrap">
        <img src={imgUrl} alt={name} />
      </div>
      <div className="name-wrap">
        <p>{name}</p>
      </div>
    </Link>
  );
}
