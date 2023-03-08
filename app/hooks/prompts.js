import { useState, useEffect, useContext } from "react";
import prompts from "../prompts.json";
import UserContext from "../state/UserContext.js";

const usePrompts = () => {
  const { updateUserArray, user } = useContext(UserContext);
  // const [prompts, setPrompts] = useState([]);

  // const i18n = new I18n(translations);
  // const translate = key => {
  //   let newKey = key;
  //   if (typeof key !== "string") {
  //     newKey = key[Math.floor(Math.random() * key.length)];
  //   }
  //   return i18n.t(newKey);
  // };

  // const loadPrompts = async () => {
  //   try {
  //     const response = await fetch("../prompts/prompts.json");
  //     console.log(response);
  //     const p = await response.json();
  //     console.log(p);
  //     setPrompts(p);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // const setI18nConfig = () => {
  //   i18n.defaultLocale = "en";
  //   const locale =
  //     Platform.OS === "ios"
  //       ? NativeModules.SettingsManager.settings.AppleLocale
  //       : NativeModules.I18nManager.localeIdentifier;
  //   loadTranslations(i18n, locale);
  //   loadTranslations(i18n, "en");
  // };

  // const initializeTranslation = () => {
  //   setI18nConfig();
  //   addEventListener("change", setI18nConfig);

  //   return () => {
  //     removeEventListener("change", setI18nConfig);
  //   };
  // };

  // TODO: API handles this
  const fetchRandomPrompt = diff => {
    // console.log(prompts);
    // console.log(diff);
    const filteredPrompts = !!diff
      ? prompts.filter(p => Number(p?.difficulty) == diff)
      : prompts;
    // console.log("filteredPrompts", filteredPrompts);
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    return filteredPrompts[randomIndex];
  };

  const addRandomPrompt = async difficulty => {
    const randomPrompt = fetchRandomPrompt(difficulty);
    // console.log(randomPrompt);
    updateUserArray("unlockedPrompts", randomPrompt);
  };

  const getPromptById = id => {};
  const allPromptsCount = prompts.length;
  const unlockedPrompts = prompts.slice(0, 50);
  const completedPrompts = prompts.slice(100, 147);
  const lockedPrompts = prompts.slice(50, 100);
  // useEffect(loadPrompts, []);

  return {
    allPromptsCount,
    getPromptById,
    unlockedPrompts,
    completedPrompts,
    lockedPrompts,
    addRandomPrompt
  };
};

export default usePrompts;
