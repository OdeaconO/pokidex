import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstallButton from "./installButton";
import Header from "./header.jsx";
import PokemonList from "./pokemonList.jsx";
import DetailsPage from "./detailsPage.jsx";

export default function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("number");

  return (
    <BrowserRouter>
      <main className="main">
        <InstallButton />

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
