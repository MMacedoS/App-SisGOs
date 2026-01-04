export const removeNonNumeric = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = removeNonNumeric(phone);

  if (cleanPhone.length < 10 || cleanPhone.length > 11) return false;

  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== "9") return false;

  if (/^(\d)\1+$/.test(cleanPhone)) return false;

  return true;
};

export const validateCellPhone = (phone: string): boolean => {
  const cleanPhone = removeNonNumeric(phone);

  if (cleanPhone.length !== 11) return false;

  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  if (cleanPhone.charAt(2) !== "9") return false;

  if (/^(\d)\1+$/.test(cleanPhone)) return false;

  return true;
};

export const validateLandline = (phone: string): boolean => {
  const cleanPhone = removeNonNumeric(phone);

  if (cleanPhone.length !== 10) return false;

  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  if (/^(\d)\1+$/.test(cleanPhone)) return false;

  return true;
};

export const formatPhone = (phone: string): string => {
  const cleanPhone = removeNonNumeric(phone);

  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return phone;
};

export const formatCellPhone = (phone: string): string => {
  const cleanPhone = removeNonNumeric(phone);
  if (cleanPhone.length !== 11) return phone;
  return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const formatLandline = (phone: string): string => {
  const cleanPhone = removeNonNumeric(phone);
  if (cleanPhone.length !== 10) return phone;
  return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};

export const getPhoneType = (
  phone: string
): "cellphone" | "landline" | "invalid" => {
  const cleanPhone = removeNonNumeric(phone);

  if (cleanPhone.length === 11 && cleanPhone.charAt(2) === "9") {
    return "cellphone";
  } else if (cleanPhone.length === 10) {
    return "landline";
  }

  return "invalid";
};
