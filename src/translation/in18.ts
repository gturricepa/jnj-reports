// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./languages/pt.json";
import en from "./languages/en.json";
import es from "./languages/es.json";

i18n.use(initReactI18next).init({
  lng: "pt",
  fallbackLng: "pt",
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
