import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { translate } from "./translate.js";
const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const t = useCallback((value) => translate(value, language), [language]);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required");
  return context;
}
