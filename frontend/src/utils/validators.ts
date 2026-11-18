export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^3[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const isValidDocumentNumber = (num: string): boolean => {
  return /^[0-9A-Za-z-]{5,20}$/.test(num.trim());
};
