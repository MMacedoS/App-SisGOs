export const removeNonNumeric = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = removeNonNumeric(cpf);

  if (cleanCPF.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
};

export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = removeNonNumeric(cnpj);

  if (cleanCNPJ.length !== 14) return false;

  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  let length = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, length);
  const digits = cleanCNPJ.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cleanCNPJ.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

export const validateDocument = (typeDoc: string, doc: string): boolean => {
  const cleanDoc = removeNonNumeric(doc);

  if (!cleanDoc) return false;

  const type = typeDoc.toUpperCase();

  switch (type) {
    case "CPF":
      return validateCPF(cleanDoc);
    case "CNPJ":
      return validateCNPJ(cleanDoc);
    default:
      return false;
  }
};

export const formatCPF = (cpf: string): string => {
  const cleanCPF = removeNonNumeric(cpf);
  if (cleanCPF.length !== 11) return cpf;
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatCNPJ = (cnpj: string): string => {
  const cleanCNPJ = removeNonNumeric(cnpj);
  if (cleanCNPJ.length !== 14) return cnpj;
  return cleanCNPJ.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
};

export const formatDocument = (typeDoc: string, doc: string): string => {
  const type = typeDoc.toUpperCase();

  switch (type) {
    case "CPF":
      return formatCPF(doc);
    case "CNPJ":
      return formatCNPJ(doc);
    default:
      return doc;
  }
};
