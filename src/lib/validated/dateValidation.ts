export const removeNonNumeric = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const validateDateBR = (date: string): boolean => {
  const cleanDate = removeNonNumeric(date);

  if (cleanDate.length !== 8) return false;

  const day = parseInt(cleanDate.substring(0, 2));
  const month = parseInt(cleanDate.substring(2, 4));
  const year = parseInt(cleanDate.substring(4, 8));

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > 2100) return false;

  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (day > (daysInMonth[month - 1] || 31)) return false;

  return true;
};

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const formatDateBR = (date: string): string => {
  const cleanDate = removeNonNumeric(date);
  if (cleanDate.length !== 8) return date;
  return cleanDate.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
};

export const parseDateBR = (date: string): Date | null => {
  if (!validateDateBR(date)) return null;

  const cleanDate = removeNonNumeric(date);
  const day = parseInt(cleanDate.substring(0, 2));
  const month = parseInt(cleanDate.substring(2, 4));
  const year = parseInt(cleanDate.substring(4, 8));

  return new Date(year, month - 1, day);
};

export const formatDateToISO = (dateBR: string): string | null => {
  const date = parseDateBR(dateBR);
  if (!date) return null;

  return date.toISOString().split("T")[0] || null;
};

export const formatDateFromISO = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
