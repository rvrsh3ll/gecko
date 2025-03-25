import React from "react";

interface HighlightedTextProps {
  text: string;
  search: string;
}

export default function HighlightedText({
  text,
  search,
}: HighlightedTextProps) {
  if (!search) {
    return <span>{text}</span>;
  }
  const parts = text.split(new RegExp(`(${search})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <span key={index} className="text-danger-dark font-bold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
