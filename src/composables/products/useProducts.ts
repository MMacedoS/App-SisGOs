import { useAuth } from "@/composables/useAuth";
import { environment } from "@/environment";

export const useProducts = () => {
  const useAuthStore = useAuth();
  const token = useAuthStore.token;

  const fetchProducts = async (page: number = 1, limit: number = 10) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/products?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    const register = await response.json();
    return {
      data: register.data,
      total: register.total || register.data?.length || 0,
      page: register.page || page,
      totalPages:
        register.totalPages || Math.ceil((register.total || 0) / limit),
    };
  };

  const postProducts = async (productData: any) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(productData),
      }
    );
    return await response.json();
  };

  const putProducts = async (id: string, productData: any) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(productData),
      }
    );
    return await response.json();
  };

  const deleteProducts = async (id: string) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return await response.json();
  };

  return {
    fetchProducts,
    postProducts,
    putProducts,
    deleteProducts,
  };
};
