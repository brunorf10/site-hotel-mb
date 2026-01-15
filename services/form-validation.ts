export interface ValidationRule {
  name: string;
  value: string;
  compareWith?: string;
}

export const validateField = (
  name: string,
  value: string,
  checkIn?: string
) => {
  let error = "";

  if (name === "name") {
    if (!value.trim()) error = "O nome é obrigatório";
    else if (value.trim().length < 3) error = "Nome muito curto";
  }

  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) error = "O e-mail é obrigatório";
    else if (!emailRegex.test(value)) error = "E-mail inválido";
  }

  if (name === "phone") {
    const digits = value.replace(/\D/g, "");
    if (!value.trim()) error = "Telefone é obrigatório";
    else if (digits.length !== 11) error = "Formato: (00) 00000-0000";
  }

  if (name === "checkIn") {
    if (!value) error = "Data obrigatória";
  }

  if (name === "checkOut") {
    if (!value) error = "Data obrigatória";
    else if (checkIn && value <= checkIn) {
      error = "Deve ser após o Check-in";
    }
  }

  if (name === "acceptedPrivacy") {
    if (!value || value === "false") error = "Você deve aceitar a política";
  }

  return error;
};
