import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  const loadFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  };

  const login = (userData: User, authToken: string) => {
    user.value = userData;
    token.value = authToken;

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    user.value = null;
    token.value = null;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData };
      localStorage.setItem("user", JSON.stringify(user.value));
    }
  };

  loadFromStorage();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
});
