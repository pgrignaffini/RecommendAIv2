import { useState, useRef } from "react";
import { useSearch } from "~/hooks/useSearch";
import type { TMDBShow } from "typings";
import SearchRow from "~/components/SearchRow";
import { useOnClickOutside } from "usehooks-ts";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const ref = useRef(null);
  const [wordEntered, setWordEntered] = useState("");
  const [hide, setHide] = useState(true);
  const { shows, search, removeSearch } = useSearch(wordEntered);

  useOnClickOutside(ref, () => {
    setHide(true);
    setWordEntered("");
  });

  return (
    <div
      ref={ref}
      className="flex-start relative inline-flex w-1/2 flex-col justify-center text-inherit"
    >
      <form
        className="grid"
        onSubmit={(e) => {
          e.preventDefault();
          search().catch(console.error);
          setHide(false);
        }}
      >
        <input
          type="text"
          className="input placeholder:italic"
          value={wordEntered}
          placeholder={placeholder}
          onChange={(e) => {
            setWordEntered(e.target.value);
            removeSearch();
          }}
        />
        <button type="submit" className="hidden" />
      </form>
      {wordEntered && !hide && (
        <ul className="absolute top-12 z-10 -mt-2 max-h-max w-full overflow-hidden overflow-y-auto rounded-b-md bg-base-100 shadow-xl scrollbar-hide">
          {shows?.slice(0, 10).map((show: TMDBShow) => (
            <SearchRow key={show.id} show={show} />
          ))}
        </ul>
      )}
    </div>
  );
}
