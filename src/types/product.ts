interface Product {
  id: string;
  code: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: "ativo" | "inativo";
}

export type { Product };
