import { useAuth } from "../useAuth";
import { environment } from "@/environment";

export const useServices = () => {
  const useAuthStore = useAuth();
  const token = useAuthStore.token;

  const fetchServices = async (
    attr: string,
    page: number = 1,
    limit: number = 10
  ) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/services?attr=${attr}&page=${page}&limit=${limit}`,
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

  const postServices = async (serviceData: any) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/services`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(serviceData),
      }
    );
    return await response.json();
  };

  const putServices = async (id: string, serviceData: any) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/services/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(serviceData),
      }
    );
    return await response.json();
  };

  const deleteServices = async (id: string) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/services/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete service");
    }
  };

  return {
    fetchServices,
    postServices,
    putServices,
    deleteServices,
  };
};
