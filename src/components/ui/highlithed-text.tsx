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

  // Check if the text contains a slash (likely a URL)
  const slashIndex = text.indexOf('/');
  if (slashIndex !== -1) {
    const beforeSlash = text.substring(0, slashIndex + 1); // Include the slash
    const afterSlash = text.substring(slashIndex + 1);
    
    // Only search in the part after the first slash
    const parts = afterSlash.split(new RegExp(`(${search})`, "gi"));
    
    return (
      <span>
        <span>{beforeSlash}</span>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={index} className="text-danger-dark font-bold">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  }

  // Original behavior for text without slashes
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
        ),
      )}
    </span>
  );
}
