import React from "react";
import { Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const ChatPage = React.lazy(() =>
  import("@/features/chat").then((module) => ({
    default: module.ChatPage,
  }))
);

const ExtractedClausesPage = React.lazy(() =>
  import("@/features/chat").then((module) => ({
    default: module.ExtractedClausesPage,
  }))
);

export const MainRoutes = () => {
  return (
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<ChatPage />} />
      <Route path="extracted-clauses" element={<ExtractedClausesPage />} />
    </Route>
  );
};
