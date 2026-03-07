import React from "react";
import SearchInput from "./ui/search-input";
import { useFindings } from "./findings-context";

export default function FindingsSearch() {
  const { search, setSearch } = useFindings();
  const [advanced, setAdvanced] = React.useState(false);

  return (
    <div>
      <SearchInput
        id="search-value"
        placeholder={advanced ? "canary value" : "search values"}
        showIcon={!advanced}
        label={advanced ? "value" : ""}
        value={search.value}
        onChange={(value) => setSearch({ ...search, value })}
      />
      {advanced && (
        <>
          <SearchInput
            id="search-source"
            placeholder="github.com"
            value={search.source}
            onChange={(value) => setSearch({ ...search, source: value })}
            label="source"
          />
          <SearchInput
            id="search-target"
            placeholder="api.github.com"
            value={search.target}
            onChange={(value) => setSearch({ ...search, target: value })}
            label="target"
          />
        </>
      )}
      <div className="mt-1 text-right">
        <span
          className="underline text-xs text-gray-600 cursor-pointer"
          onClick={() => {
            if (advanced) {
              setSearch({ ...search, source: "", target: "" });
            }
            setAdvanced(!advanced);
          }}
        >
          {advanced ? "Hide" : "Advanced search"}
        </span>
      </div>
    </div>
  );
}
