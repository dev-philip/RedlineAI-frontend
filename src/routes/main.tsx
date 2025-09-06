import React from "react";
import { Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const IngestPage = React.lazy(() =>
  import("@/features/ingest").then((module) => ({
    default: module.IngestPage,
  }))
);

const ExtractedClausesPage = React.lazy(() =>
  import("@/features/ingest").then((module) => ({
    default: module.ExtractedClausesPage,
  }))
);

export const MainRoutes = () => {
  return (
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<IngestPage />} />
      <Route path="extracted-clauses" element={<ExtractedClausesPage />} />
    </Route>
  );
};
