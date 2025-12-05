import React, { createContext, useContext, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { Finding, Search } from "../shared/types";

interface FindingsContextType {
  findings: Finding[];
  clearFindings: () => void;
  refreshFindings: () => void;
  search: Search;
  setSearch: (search: Search) => void;
}

const FindingsContext = createContext<FindingsContextType>({
  findings: [],
  clearFindings: () => {},
  refreshFindings: () => {},
  search: { value: "", source: "", target: "" } as Search,
  setSearch: () => {},
});

export const FindingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rawFindings, setRawFindings] = useState<Finding[]>([]);
  const [filteredFindings, setFilteredFindings] = useState<Finding[]>([]);
  const [search, setSearch] = useState<Search>({
    value: "",
    source: "",
    target: "",
  });

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
    let valueSearch  = search.value.toLowerCase().trim();
    let targetSearch = search.target.toLowerCase().trim();
    let sourceSearch = search.source.toLowerCase().trim();

    const checkTerms = (text:string, termString:string) => {
      const terms = termString.split(/\s+/); // split by spaces
      return terms.every(t => {
        if (t.startsWith('-')) return !text.includes(t.slice(1)); // negative term
        return text.includes(t); // positive term
      });
    };

    let filtered = rawFindings;

    if (valueSearch || targetSearch || sourceSearch) {
      filtered = rawFindings.filter(f => {
        const source = f.source.url.toLowerCase();
        const target = f.target.url.toLowerCase();
        const value  = f.source.value.toLowerCase();

        if (valueSearch  && !checkTerms(value, valueSearch)) return false;
        if (sourceSearch && !checkTerms(source, sourceSearch)) return false;
        if (targetSearch && !checkTerms(target, targetSearch)) return false;

        return true;
      });
    }

    setFilteredFindings(filtered);
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
