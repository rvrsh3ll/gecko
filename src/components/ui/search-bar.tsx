import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

interface ToggleProps {
  placeholder: string;
  onChange: (search: string) => void;
}

export default function SearchBar({ placeholder, onChange }: ToggleProps) {
  return (
    <div>
      <div className="mt-2 grid grid-cols-1">
        <input
          id="search"
          name="search"
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
        />
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
        />
      </div>
    </div>
  );
}
