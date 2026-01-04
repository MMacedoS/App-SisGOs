export interface Service {
  id: string;
  code: string;
  name: string;
  description: string;
  duration: number;
  category: "rede" | "hardware" | "software" | "manutencao" | "outros";
  value: number;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceResponse {
  data: Service[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ServiceRequest {
  name: string;
  description: string;
  value: number;
  status: string | null;
  category: string;
  duration: number;
}
