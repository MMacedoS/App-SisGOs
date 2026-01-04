export const validateCurrency = (value: string): boolean => {
  const regex = /^R\$\s?\d{1,3}(\.\d{3})*,\d{2}$/;
  return regex.test(value.trim()) || /^\d+([.,]\d{1,2})?$/.test(value.trim());
};

export const formatCurrency = (value: number | string): string => {
  let numValue: number;

  if (typeof value === "string") {
    const cleanValue = value.replace(/[^\d,.-]/g, "").replace(",", ".");
    numValue = parseFloat(cleanValue);
  } else {
    numValue = value;
  }

  if (isNaN(numValue)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numValue);
};

export const parseCurrency = (value: string): number => {
  const cleanValue = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const numValue = parseFloat(cleanValue);
  return isNaN(numValue) ? 0 : numValue;
};

export const formatCurrencyInput = (value: string): string => {
  let cleanValue = value.replace(/\D/g, "");

  if (cleanValue === "") return "";

  while (cleanValue.length < 3) {
    cleanValue = "0" + cleanValue;
  }

  const intPart = cleanValue.slice(0, -2);
  const decPart = cleanValue.slice(-2);

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${formattedInt},${decPart}`;
};

export const unformatCurrency = (value: string): string => {
  return value.replace(/[^\d,]/g, "").replace(",", ".");
};
