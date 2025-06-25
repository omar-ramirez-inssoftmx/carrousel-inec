import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const maskEmail = (email) => {
  if (!email) return "";
  
  const [user, domain] = email.split("@");

  const maskedUser = user.slice(0, 2) + "*".repeat(user.length - 2);

  return `${maskedUser}@${domain}`;
};

export const maskPhone = (phone) => {
  if (!phone) return "";

  const enmascarado = "*".repeat(phone.length - 4) + phone.slice(-4);
  return enmascarado;
};
