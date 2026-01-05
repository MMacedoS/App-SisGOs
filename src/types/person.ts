export interface Person {
  id: string;
  code: number;
  name: string;
  email: string;
  status: string | null;
  type_doc: string;
  doc: string;
  gender?: string | null;
  birth_date: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  country?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
