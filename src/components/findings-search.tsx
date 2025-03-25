import React from "react";
import SearchBar from "./ui/search-bar";
import { useFindings } from "./findings-context";

export default function FindingsSearch() {
  const { search, setSearch } = useFindings();
  const [advanced, setAdvanced] = React.useState(false);

  return (
    <div>
      <SearchBar placeholder="Search values" showIcon onChange={(value) => setSearch({ ...search, value })} />
      {advanced && (
        <>
          <SearchBar placeholder="github.com" onChange={(value) => setSearch({ ...search, source: value })} label="source" />
          <SearchBar placeholder="api.github.com" onChange={(value) => setSearch({ ...search, target: value })} label="target" />
        </>
      )}
      <div className="mt-1 text-right">
        <span
          className="underline text-xs text-gray-600 cursor-pointer"
          onClick={() => setAdvanced(!advanced)}
        >
          {advanced ? "Hide" : "Advanced search"}
        </span>
      </div>
    </div>
  );
}
