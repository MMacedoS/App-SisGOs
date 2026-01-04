import { environment } from "@/environment";
import { useAuth } from "../useAuth";

export const useCustomers = () => {
  const useAuthStore = useAuth();
  const token = useAuthStore.token;

  const fetchCustomers = async (
    attr: string,
    page: number = 1,
    limit: number = 10
  ) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/customers?attr=${attr}&page=${page}&limit=${limit}`,
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

  const postCustomers = async (customerData: any) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(customerData),
      }
    );
    return await response.json();
  };

  const putCustomers = async (id: string, customerData: any) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/customers/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(customerData),
      }
    );
    return await response.json();
  };

  const deleteCustomers = async (id: string) => {
    const response = await fetch(
      `${environment.VITE_URL_API}:${environment.VITE_PORT}${environment.VITE_PREFIX_API}/customers/${id}`,
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
    fetchCustomers,
    postCustomers,
    putCustomers,
    deleteCustomers,
  };
};
