import type { Person } from "./person";

export interface Customer {
  id: string;
  code: string;
  person: Person;
  status: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerResponse {
  data: Customer[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CustomerRequest {
  name: string;
  email: string;
  status: string | null;
  type_doc: string;
  doc: string;
  birth_date: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  country?: string | null;
}
