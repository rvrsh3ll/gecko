enum SourceType {
  QueryValue = "Query Parameter",
  QueryValueEncoded = "Query Parameter (URL encoded)",
  PathValue = "Path",
  PathValueEncoded = "Path (URL encoded)",
  UndefinedValue = "Undefined Variable",
  NullValue = "Null Variable",
}

interface Source {
  type: SourceType;
  url: string;
  value: string;
}

interface Target {
  url: string;
}

interface Finding {
  source: Source;
  target: Target;
}

// TODO: do we need this?
interface FindingUI {
  index: number;
  finding: Finding;
  croppedSourceUrl: string;
  croppedTargetUrl: string;
}

interface Settings {
  scanners: {
    searchQueryValues: boolean;
    searchPath: boolean;
    searchNullUndefined: boolean;
  };
  matching: {
    partial: boolean;
    partialMinLength: number;
    caseInsensitive: boolean;
  };
  display: {
    clearOnRefresh: boolean;
  };
}

interface Search {
  value: string;
  source: string;
  target: string;
}

export { SourceType, Source, Finding, FindingUI, Settings, Search };
