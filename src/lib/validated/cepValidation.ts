export const removeNonNumeric = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const validateCEP = (cep: string): boolean => {
  const cleanCEP = removeNonNumeric(cep);

  if (cleanCEP.length !== 8) return false;

  if (/^(\d)\1{7}$/.test(cleanCEP)) return false;

  return true;
};

export const formatCEP = (cep: string): string => {
  const cleanCEP = removeNonNumeric(cep);
  if (cleanCEP.length !== 8) return cep;
  return cleanCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
};
