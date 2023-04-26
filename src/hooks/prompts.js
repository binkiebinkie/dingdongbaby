import { useContext, useEffect, useState } from "react";
import {
  assignRandomPromptToUser,
  readUnlockedPrompts,
  readLockedPrompts,
  readUnlockedPrompt,
  readCompletedPrompts,
} from "../api/prompts";
import prompts from "../prompts.json";
import AppContext from "../state/AppContext";
import useListState from "./list";
import useUser from "./user";

const usePrompts = () => {
  const { setUserState } = useUser();
  const { selectedPrompt, setSelectedPrompt } = useContext(AppContext);
  const {
    listState: unlockedPrompts,
    setListState: setUnlockedPrompts,
    fetchListState: fetchUnlockedPrompts,
  } = useListState(
    null,
    {
      create: () => {},
      read: readUnlockedPrompts,
      update: () => {},
      delete: () => {},
    },
    "unlockedPromptIds"
  );

  const {
    listState: lockedPrompts,
    setListState: setLockedPrompts,
    fetchListState: fetchLockedPrompts,
  } = useListState(
    null,
    {
      create: () => {},
      read: readLockedPrompts,
      update: () => {},
      delete: () => {},
    },
    "lockedPromptIds"
  );

  const addRandomPromptToUser = async (difficulty) => {
    try {
      const { data } = await assignRandomPromptToUser({ difficulty });
      setUserState((prevState) => ({
        ...prevState,
        unlockedPromptIds: [...prevState.unlockedPromptIds, data],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const getPromptById = async (id = "") => {
    try {
      const { data } = await readUnlockedPrompt(id);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const allPromptsCount = prompts.length;
  const fetchSelectedPrompt = async () => {
    try {
      const prompt = await getPromptById(selectedPrompt?.id);
      setSelectedPrompt(prompt);
    } catch (err) {
      console.error("Error fetching selected prompt", err);
    }
  };

  useEffect(() => {
    if (!!selectedPrompt?.id) {
      fetchSelectedPrompt();
    } else {
      setSelectedPrompt({});
    }
  }, [selectedPrompt?.id]);

  return {
    allPromptsCount,
    getPromptById,
    selectedPrompt,
    lockedPrompts,
    unlockedPrompts,
    addRandomPromptToUser,
  };
};

export default usePrompts;
