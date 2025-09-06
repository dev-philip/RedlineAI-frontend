import type { Clause, User } from "./models";

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (code: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
};

export type IngestState = {
  clauses: Clause[];
  selectedClause: Clause | null;
};

export type IngestActions = {
  loadClauses: () => Promise<void>;
  uploadFiles: (
    files: File[],
    user_id: string | null,
    onProgress?: (progress: number) => void
  ) => Promise<void>;
  selectClause: (clauseId: string | null) => void;
};
