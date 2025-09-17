import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  fairy: "#EE99AC",
  fighting: "#7b2520ff",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
  ground: "#E0C068",
};

const statAbbreviations = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SPATK",
  "special-defense": "SPDEF",
  speed: "SPD",
};

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch Pokemon data");
        }
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  function convertWeight(weightHg) {
    const kg = weightHg / 10;
    const lbs = kg * 2.20462;
    return `${kg.toFixed(1)} kg (${lbs.toFixed(1)} lbs)`;
  }

  function convertHeight(heightDm) {
    const meters = heightDm / 10;
    const totalInches = meters * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${meters.toFixed(2)} m (${feet}'${inches}")`;
  }

  if (loading) return <p>Loading Pokemon...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <main
      className="detail-main"
      style={{ backgroundColor: typeColors[pokemon.types[0].type.name] }}
    >
      <header className="header">
        <div className="header-wrapper">
          <div className="header-wrap">
            <button
              className="home-btn-wrap"
              onClick={() => navigate("/")}
              aria-label="Go to home"
            >
              <img
                src="/home.svg"
                alt="home icon"
                width={32}
                height={32}
                className="home-btn"
              />
            </button>
            <div className="name-wrap">
              <h1 className="name">{pokemon.name.toUpperCase()}</h1>
            </div>
          </div>
          <div className="pokemon-id-wrap">
            <p className="body2-fonts">#{pokemon.id}</p>
          </div>
        </div>
      </header>

      <div className="featured-img">
        <button
          className="arrow left-arrow"
          onClick={() => navigate(`/pokemon/${+id - 1}`)}
          disabled={+id <= 1}
        >
          <img src="/chevron_left.svg" alt="back" />
        </button>
        <div className="detail-img-wrapper">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>
        <button
          className="arrow right-arrow"
          onClick={() => navigate(`/pokemon/${+id + 1}`)}
        >
          <img src="/chevron_right.svg" alt="forward" />
        </button>
      </div>

      <div className="detail-card-detail-wrapper">
        <div className="power-wrapper">
          {pokemon.types.map((t) => (
            <p
              key={t.type.name}
              className={`body3-fonts type ${t.type.name}`}
              style={{
                backgroundColor: typeColors[t.type.name],
                color: "#fff",
              }}
            >
              {t.type.name}
            </p>
          ))}
        </div>

        <p className="body2-fonts about-text">About</p>
        <div className="pokemon-detail-wrapper">
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src="/weight.svg" alt="weight" />
              <p className="body3-fonts">{convertWeight(pokemon.weight)}</p>
            </div>
            <p className="caption-fonts">Weight</p>
          </div>
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src="/height.svg" alt="height" />
              <p className="body3-fonts">{convertHeight(pokemon.height)}</p>
            </div>
            <p className="caption-fonts">Height</p>
          </div>
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail move">
              {pokemon.moves.slice(0, 2).map((m) => (
                <p key={m.move.name}>• {m.move.name}</p>
              ))}
            </div>
            <p className="caption-fonts">Moves</p>
          </div>
        </div>

        <p className="body2-fonts about-text">Base Stats</p>
        <div className="stats-wrapper">
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="stats-wrap">
              <p className="body3-fonts stats">
                {statAbbreviations[s.stat.name] || s.stat.name.toUpperCase()}
              </p>
              <p className="body3-fonts stats">{s.base_stat}</p>
              <progress
                value={s.base_stat}
                max="255"
                className="progress-bar"
              />
            </div>
          ))}
        </div>
      </div>

      <img src="/pokedex.svg" alt="pokedex" className="detail-bg" />
    </main>
  );
}
