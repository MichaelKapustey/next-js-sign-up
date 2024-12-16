import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ValidationRule {
    label: string;
    regex: string;
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const validate = (rules: ValidationRule[], str: string): string[] => rules.map(r => (new RegExp(r.regex)).test(str) ? null : r.label).filter(x => x !== null);
