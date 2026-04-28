import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToNaira(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid number provided");
  }

  // Create a new NumberFormat object for Nigerian Naira without decimal places
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Format the amount
  return formatter.format(amount);
}
