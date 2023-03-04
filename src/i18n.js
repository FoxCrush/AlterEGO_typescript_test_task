import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(Backend)
  .init({
    // debug: true,
    fallbackLng: "en",
    backend: {
      loadPath: "/AlterEGO_typescript_test_task/locales/{{lng}}/{{ns}}.json",
    },
  });
