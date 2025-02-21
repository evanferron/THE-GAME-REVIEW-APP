import { User } from "..";

// ###  Définition de l'interface représentant l'état de l'authentification. ### //
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null; // Informations sur l'utilisateur connecté, ou null si non connecté.
}
