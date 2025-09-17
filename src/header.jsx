import Logo from "./logo";
import SearchBar from "./searchBar";
import InstallButton from "./installButton";

export default function Header({ setSearch, search, sort, setSort }) {
  return (
    <header className="header-home">
      <div className="container">
        <Logo />
        <SearchBar
          setSearch={setSearch}
          search={search}
          sort={sort}
          setSort={setSort}
        />
        <InstallButton />
      </div>
    </header>
  );
}
