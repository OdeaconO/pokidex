import { useState } from "react";
import "./App.css";
import Header from "./header";
import PokemonList from "./pokemonList";
import DetailsPage from "./detailsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("number");
  return (
    <BrowserRouter>
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  setSearch={setSearch}
                  search={search}
                  sort={sort}
                  setSort={setSort}
                />
                <PokemonList search={search} sort={sort} />
              </>
            }
          />
          <Route path="/pokemon/:id" element={<DetailsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
