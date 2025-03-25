import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

interface ToggleProps {
  placeholder: string;
  onChange: (search: string) => void;
  label?: string;
  showIcon?: boolean;
}

export default function SearchInput({
  placeholder,
  onChange,
  label,
  showIcon,
}: ToggleProps) {
  label = label ? label.trim() : "";
  showIcon = showIcon ? showIcon : false;

  const pl = showIcon ? "pl-10" : "pl-3";

  return (
    <div>
      {label && (
        <label className="block mt-2 text-xs text-gray-600">{label}</label>
      )}
      <div className="grid grid-cols-1">
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
          className={`col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-xs ${pl}`}
        />
        {showIcon && (
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-3 self-center text-gray-400 sm:size-4"
          />
        )}
      </div>
    </div>
  );
}
