// Validar email
export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Validar password (mínimo 6 caracteres)
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Validar campos vacíos
export const isEmpty = (value) => {
  return !value || value.trim().length === 0;
};
