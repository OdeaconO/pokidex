import { useState } from "react";

export default function SortFilter({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sort-wrapper">
      <div className="sort-wrap">
        <img
          src="/sorting.svg"
          alt="sorting"
          className="sort-icon"
          onClick={() => setOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
      </div>
      {open && (
        <div className="filter-wrapper">
          <p className="body2-fonts">Sort by:</p>
          <div className="filter-wrap">
            <div>
              <input
                type="radio"
                id="number"
                name="filters"
                value="number"
                checked={sort === "number"}
                onChange={(e) => setSort(e.target.value)}
              />
              <label htmlFor="number" className="body3-fonts">
                Number
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="name"
                name="filters"
                value="name"
                checked={sort === "name"}
                onChange={(e) => setSort(e.target.value)}
              />
              <label htmlFor="name" className="body3-fonts">
                Name
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
