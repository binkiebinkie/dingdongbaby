// import {
//   findBestAvailableLanguage,
//   addEventListener,
//   removeEventListener
// } from "react-native-localize";
import { I18n } from "i18n-js";
import { Platform, NativeModules } from "react-native";
import en from "../translations/en.translation.json";
import fr from "../translations/fr.translation.json";
import sp from "../translations/sp.translation.json";
import ja from "../translations/ja.translation.json";

const useTranslation = () => {
  const translations = {
    en,
    fr,
    sp,
    ja
  };

  // const i18n = new I18n(translations);
  const translate = key => {
    // let newKey = key;
    // if (typeof key !== "string") {
    //   newKey = key[Math.floor(Math.random() * key.length)];
    // }
    // return i18n.t(newKey);
  };

  const loadTranslations = async (i18n, locale) => {
    // const response = await fetch(`/translations/${locale}.json`);
    // const translations = await response.json();

    // i18n.store(translations);
  };

  const setI18nConfig = () => {
    // i18n.defaultLocale = "en";
    // const locale =
    //   Platform.OS === "ios"
    //     ? NativeModules.SettingsManager.settings?.AppleLocale
    //     : NativeModules.I18nManager?.localeIdentifier || "en";
    // loadTranslations(i18n, locale);
    // loadTranslations(i18n, "en");
  };

  const initializeTranslation = () => {
    // setI18nConfig();
    // addEventListener("change", setI18nConfig);

    // return () => {
    //   removeEventListener("change", setI18nConfig);
    // };
  };

  return {
    t: translate,
    initializeTranslation
  };
};

export default useTranslation;

// // import {
// //   findBestAvailableLanguage,
// //   addEventListener,
// //   removeEventListener
// // } from "react-native-localize";
// import { getLocales, getCalendars } from "expo-localization";
// import { Platform, NativeModules } from "react-native";
// import { useState } from "react";

// // import { I18n } from "i18n-js";
// import en from "../translations/en.translation.json";
// import fr from "../translations/fr.translation.json";
// import sp from "../translations/sp.translation.json";
// import ja from "../translations/ja.translation.json";

// const useTranslation = () => {
//   const [translations, setTranslations] = useState({
//     en,
//     fr,
//     sp,
//     ja
//   });

//   const localization = getLocales();
//   console.log(localization);

//   const defaultLocale = localization[0].languageCode;
//   const translate = (key, vars) => {
//     console.log(en);
//     console.log(vars);

//     let newKey = key;
//     if (typeof key !== "string") {
//       newKey = key[Math.floor(Math.random() * key.length)];
//     }

//     console.log(newKey);
//     console.log(translations);
//     if (translations[defaultLocale] && translations[defaultLocale][newKey])
//       return translations[defaultLocale][newKey];
//     return translations.en?.newKey || "";
//   };

//   const loadTranslations = async locale => {
//     const response = await fetch(`/translations/${locale}.json`);
//     const translation = await response.json();
//     console.log("translation", translation);
//     console.log("locale", locale);
//     setTranslations(prevState => ({ ...prevState, [locale]: translation }));
//   };

//   const setI18nConfig = async () => {
//     // i18n.defaultLocale = "en";
//     // const locale =
//     //   Platform.OS === "ios"
//     //     ? NativeModules.SettingsManager.settings.AppleLocale
//     //     : NativeModules.I18nManager.localeIdentifier;

//     for (let i = 0; i < localization.length; i++) {
//       console.log(localization[i]);
//       await loadTranslations(localization[i].languageCode);
//     }
//   };

//   const initializeTranslation = async () => {
//     await setI18nConfig();
//     //   addEventListener("change", setI18nConfig);
//     //   return () => {
//     //     removeEventListener("change", setI18nConfig);
//     //   };
//   };

//   return {
//     t: translate,
//     initializeTranslation
//   };
// };

// export default useTranslation;
