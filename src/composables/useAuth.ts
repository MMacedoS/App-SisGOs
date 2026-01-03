import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import type { Router } from "vue-router";

export const useAuth = () => {
  const authStore = useAuthStore();

  const user = computed(() => authStore.user);
  const token = computed(() => authStore.token);
  const isAuthenticated = computed(() => authStore.isAuthenticated);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      authStore.login(data.user, data.token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao fazer login",
      };
    }
  };

  const logout = (router?: Router) => {
    authStore.logout();
    if (router) {
      router.push("/login");
    }
  };

  const updateUserData = (userData: Partial<typeof authStore.user>) => {
    authStore.updateUser(userData ?? {});
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    updateUserData,
  };
};
