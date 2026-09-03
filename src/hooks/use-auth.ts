/**
 * Auth hook stub.
 * Convex auth has been removed — authentication is handled by Supabase.
 * This hook provides a minimal interface so existing components that import
 * useAuth (LogoDropdown, RequireAuth, Auth, Dashboard) continue to compile.
 * Replace this with a real Supabase auth hook when ready.
 */

export function useAuth() {
  return {
    isLoading: false,
    isAuthenticated: false,
    user: null as { name?: string } | null,
    signIn: async (_method?: string, _data?: unknown) => {},
    signOut: async () => {},
  };
}
