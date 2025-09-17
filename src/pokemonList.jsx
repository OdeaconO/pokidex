import { useEffect, useState } from "react";
import PokemonCard from "./pokemonCard";

export default function PokemonList({ search, sort }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_POKEMON = 151;
  const URL = `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        const withNumbers = data.results.map((p) => {
          const number = Number(p.url.split("/").filter(Boolean).pop());
          return { ...p, number };
        });

        setPokemons(withNumbers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [URL]);

  if (loading) {
    return <p>Loading Pokemons...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const q = search.trim().toLowerCase();

  let filteredPokemons = q
    ? pokemons.filter(
        (p) => p.name.includes(q) || p.number.toString().startsWith(q)
      )
    : pokemons;

  filteredPokemons = [...filteredPokemons].sort((a, b) => {
    if (sort === "number") {
      return a.number - b.number;
    } else if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <section className="pokemon-list">
      <div className="container">
        {filteredPokemons.length === 0 ? (
          <div id="not-found-message">Pokemon not found</div>
        ) : (
          <div className="list-wrapper">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.number}
                name={pokemon.name}
                number={pokemon.number}
                id={pokemon.number}
              ></PokemonCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
