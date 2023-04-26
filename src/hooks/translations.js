import {
  findBestAvailableLanguage,
  addEventListener,
  removeEventListener,
} from "react-native-localize";
import { I18n } from "i18n-js";
import en from "../translations/en.translation.json";
import fr from "../translations/fr.translation.json";
import es from "../translations/es.translation.json";
import ja from "../translations/ja.translation.json";

const useTranslation = () => {
  const translations = {
    en,
    fr,
    es,
    ja,
  };

  const i18n = new I18n(translations);
  const translate = (key) => {
    let newKey = key;
    if (typeof key !== "string") {
      newKey = key[Math.floor(Math.random() * key.length)];
    }
    return i18n.t(newKey);
  };

  const setI18nConfig = () => {
    const bestTranslation = findBestAvailableLanguage(
      Object.keys(translations)
    );
    i18n.locale = bestTranslation.languageTag;
  };

  const initializeTranslation = () => {
    setI18nConfig();
    addEventListener("change", setI18nConfig);

    return () => {
      removeEventListener("change", setI18nConfig);
    };
  };

  return {
    t: translate,
    initializeTranslation,
  };
};

export default useTranslation;
