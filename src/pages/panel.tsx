import React from "react";
import { createRoot } from "react-dom/client";
import FindingsTable from "../components/findings-table";
import FindingDrawer from "../components/finding-drawer";
import { FindingUI } from "../shared/types";
import { FindingsProvider } from "../components/findings-context";

const Panel = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedFinding, setSelectedFinding] =
    React.useState<FindingUI | null>(null);

  const handleRowClick = (finding: FindingUI) => {
    setSelectedFinding(finding);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="pt-4 pb-8">
      <FindingsProvider>
        <FindingsTable onRowClick={handleRowClick} />
        <FindingDrawer
          open={isDrawerOpen}
          finding={selectedFinding}
          onClose={handleCloseDrawer}
        />
      </FindingsProvider>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Panel />);
} else {
  console.error("Root container not found");
}
