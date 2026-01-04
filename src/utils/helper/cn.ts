import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function untuk menggabungkan className dengan handling conflicts
 * Menggunakan clsx untuk conditional classes dan twMerge untuk merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
