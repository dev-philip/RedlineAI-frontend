import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { IngestActions, IngestState } from "../types/store";
import { RiskLevel } from "@/utils/enums";
import { ingest_data } from "@/api/ingest/ingest-data";

export const useIngestStore = create<IngestState & IngestActions>()(
  persist(
    (set) => ({
      clauses: [],
      selectedClause: null,

      loadClauses: async () => {
        set({
          clauses: [
            {
              id: "1",
              title: "Uptime Guarantee",
              description:
                "Provider guarantees 99.5% uptime excluding scheduled maintenance…",
              label: "Service Performance",
              risk_level: RiskLevel.High,
            },
            {
              id: "2",
              title: "Data Retention",
              description: "Retention period exceeds company policy…",
              label: "Compliance",
              risk_level: RiskLevel.Medium,
            },
            {
              id: "3",
              title: "Termination",
              description:
                "Either party may terminate this agreement with 30 days' notice…",
              label: "Legal",
              risk_level: RiskLevel.Low,
            },
          ],
        });
      },

      selectClause: (clauseId) =>
        set((state) => ({
          selectedClause:
            clauseId === null
              ? null
              : state.clauses.find((clause) => clause.id === clauseId) || null,
        })),

      uploadFiles: async (
        files: File[],
        user_id: string | null,
        onProgress?: (progress: number) => void
      ) => {
        try {
          await ingest_data({ files, user_id }, onProgress);
        } catch (error) {
          console.error("File upload failed:", error);
        }
      },
    }),

    {
      name: "ingest-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
