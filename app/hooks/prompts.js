import { useState, useEffect, useContext } from "react";
import prompts from "../prompts.json";
import UserContext from "../state/UserContext.js";

const usePrompts = () => {
  const { updateUserArray, userState } = useContext(UserContext);

  // TODO: API handles this
  const fetchRandomPrompt = diff => {
    const filteredPrompts = !!diff
      ? prompts.filter(p => Number(p?.difficulty) == diff)
      : prompts;
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    return filteredPrompts[randomIndex];
  };

  const addRandomPrompt = async difficulty => {
    const randomPrompt = fetchRandomPrompt(difficulty);
    console.log(randomPrompt);
    updateUserArray("unlockedPrompts", randomPrompt?.id);
  };

  const getPromptById = (id = "") => prompts.find(p => p?.id == id);
  const getPromptsById = (ids = []) => ids.map(id => getPromptById(id));

  const allPromptsCount = prompts.length;
  const unlockedPrompts = getPromptsById(userState?.unlockedPrompts);
  const completedPrompts = prompts.slice(0, 50);
  const lockedPrompts = prompts.slice(50, 100);

  return {
    allPromptsCount,
    getPromptById,
    getPromptsById,
    unlockedPrompts,
    completedPrompts,
    lockedPrompts,
    addRandomPrompt
  };
};

export default usePrompts;
