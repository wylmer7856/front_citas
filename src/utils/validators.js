export const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isPhone = (phone) => /^[0-9]{7,15}$/.test(phone);
export const isPasswordStrong = (password) => password.length >= 6;
export const isDateValid = (date) => !isNaN(Date.parse(date));
