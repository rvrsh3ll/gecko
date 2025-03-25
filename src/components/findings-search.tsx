import React from "react";
import SearchInput from "./ui/search-input";
import { useFindings } from "./findings-context";

export default function FindingsSearch() {
  const { search, setSearch } = useFindings();
  const [advanced, setAdvanced] = React.useState(false);

  return (
    <div>
      <SearchInput
        placeholder={advanced ? "canary value" : "search values"}
        showIcon={!advanced}
        label={advanced ? "value" : ""}
        onChange={(value) => setSearch({ ...search, value })}
      />
      {advanced && (
        <>
          <SearchInput
            placeholder="github.com"
            onChange={(value) => setSearch({ ...search, source: value })}
            label="source"
          />
          <SearchInput
            placeholder="api.github.com"
            onChange={(value) => setSearch({ ...search, target: value })}
            label="target"
          />
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
