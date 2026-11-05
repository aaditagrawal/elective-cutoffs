import { twMerge } from "tailwind-merge";

type ClassValue = string | number | bigint | boolean | null | undefined | ClassValue[] | ClassMap;

interface ClassMap {
  [className: string]: unknown;
}

function classNames(inputs: ClassValue[]): string {
  let classes = "";
  for (const input of inputs) {
    if (!input) continue;
    let words = "";
    if (typeof input === "string") {
      words = input;
    } else if (typeof input === "number") {
      words = String(input);
    } else if (Array.isArray(input)) {
      words = classNames(input);
    } else if (typeof input === "object") {
      for (const className in input) {
        if (input[className]) classes += classes ? ` ${className}` : className;
      }
    }
    if (words) classes += classes ? ` ${words}` : words;
  }
  return classes;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(classNames(inputs));
}
