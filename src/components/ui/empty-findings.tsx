import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function EmptyFindings() {
  return (
    <div className="text-center my-5">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No findings</h3>
      <p className="mt-1 text-sm text-gray-500">
        Keep navigating or change the search criteria to get more findings.
      </p>
    </div>
  );
}
