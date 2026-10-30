import { sepedi } from "./sepedi.js";
export function translate(value, language = "en") {
  if (language !== "nso" || typeof value !== "string") return value;
  return sepedi[value] ?? value;
}
