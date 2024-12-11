import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export function SearchBar({ query, setQuery }) {
  //when the website loads the input field automatically focus without the user selecting the search field
  // useEffect(function () {
  //   const element = document.querySelector(".search");
  //   element.focus();
  // }, []);

  //using ref
  const inputElement = useRef(null);

  useKey("Enter", function (event) {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputElement}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
