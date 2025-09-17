import SortFilter from "./sortFilter";

export default function SearchBar({ setSearch, search, sort, setSort }) {
  return (
    <div className="search-wrapper">
      <div className="search-wrap">
        <img src="/search.svg" alt="search" className="search-icon" />
        <input
          type="text"
          className="search-input body3-fonts"
          placeholder="Search"
          id="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <img
          src="/cross.svg"
          alt="cross icon"
          className="search-close-icon"
          id="search-close-icon"
        />
      </div>

      <SortFilter sort={sort} setSort={setSort} />
    </div>
  );
}
