import React, { createContext, useContext, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { Finding } from "../shared/types";

interface FindingsContextType {
  findings: Finding[];
  clearFindings: () => void;
  refreshFindings: () => void;
  search: string;
  setSearch: (search: string) => void;
}

const FindingsContext = createContext<FindingsContextType>({
  findings: [],
  clearFindings: () => {},
  refreshFindings: () => {},
  search: "",
  setSearch: () => {},
});

export const FindingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rawFindings, setRawFindings] = useState<Finding[]>([]);
  const [filteredFindings, setFilteredFindings] = useState<Finding[]>([]);
  const [search, setSearch] = useState<string>("");

  const fetchFindings = () => {
    browser.storage.local.get("findings").then((data) => {
      data.findings = data.findings || [];
      const findingsData = data as { findings: Finding[] };
      setRawFindings(findingsData.findings);
    });
  };

  const clearFindings = () => {
    browser.storage.local.set({ findings: [] });
    setRawFindings([]);
  };

  useEffect(() => {
    fetchFindings();
    browser.storage.local.onChanged.addListener((changes) => {
      if (changes.findings) {
        fetchFindings();
      }
    });
  }, []);

  useEffect(() => {
    let sanitizedSearch = search.toLowerCase().trim();
    if (search) {
      setFilteredFindings(
        rawFindings.filter((finding) =>
          finding.source.value.toLowerCase().includes(sanitizedSearch),
        ),
      );
    } else {
      setFilteredFindings(rawFindings);
    }
  }, [search, rawFindings]);

  return (
    <FindingsContext.Provider
      value={{
        findings: filteredFindings,
        clearFindings,
        refreshFindings: fetchFindings,
        search,
        setSearch,
      }}
    >
      {children}
    </FindingsContext.Provider>
  );
};

export const useFindings = () => {
  const context = useContext(FindingsContext);
  if (!context) {
    throw new Error("useFindings must be used within a FindingsProvider");
  }
  return context;
};
