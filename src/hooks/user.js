import { useContext } from "react";
import {
  updateUserCompletedPrompt,
  updateUserCompletedPromptAsset,
  updateUserOnboarding,
  updateUserCredentials,
  updateUser,
} from "../api/users";
import UserContext from "../state/UserContext";

const useUser = () => {
  const { userState, setUserState } = useContext(UserContext);

  const updateUserKeyValue = (key, value) => {
    setUserState((prevState) => ({ ...prevState, [key]: value }));
  };

  const updateUserArray = (key, value) => {
    setUserState((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], value],
    }));
  };

  const updateCompletedPromptsAsset = async (promptId, asset) => {
    try {
      const { data } = await updateUserCompletedPromptAsset(promptId, {
        asset,
      });
      setUserState({ ...data, completedPrompts: [...data.completedPrompts] });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const updateCompletedPrompt = async (key, value, id) => {
    try {
      const { data } = await updateUserCompletedPrompt(id, {
        [key]: value,
      });
      setUserState({ ...data, completedPrompts: [...data?.completedPrompts] });
    } catch (err) {
      console.error(err);
    }
  };

  const getCompletedPromptByPromptId = (promptId) => {
    const completedPrompt = userState?.completedPrompts?.find(
      (p) => p.id === promptId
    );

    return !!completedPrompt ? completedPrompt : {};
  };

  const getSelectedAssetByPromptId = (promptId) => {
    const completedPrompt = getCompletedPromptByPromptId(promptId);
    if (!completedPrompt) return {};
    const { selectedAsset } = completedPrompt;

    return !selectedAsset &&
      selectedAsset !== 0 &&
      completedPrompt?.assets?.length > 0
      ? completedPrompt?.assets[0] || {}
      : completedPrompt?.assets?.find(
          (a) => a.id === completedPrompt?.selectedAsset
        ) || {};
  };

  const updateCredentials = async (data) => {
    try {
      await updateUserCredentials(data);
    } catch (err) {
      return err;
    }
  };

  const togglePrioritizedPrompt = async (promptId) => {
    try {
      const { prioritizedPrompts } = userState;
      if (!prioritizedPrompts) return;
      let newPrioritizedPrompts = [...prioritizedPrompts];
      const id = Number(promptId);
      const index = newPrioritizedPrompts.findIndex(
        (pid) => Number(id) === pid
      );
      if (index > -1) {
        newPrioritizedPrompts = newPrioritizedPrompts.filter(
          (pp) => Number(pp) !== id
        );
      } else {
        newPrioritizedPrompts = [...newPrioritizedPrompts, id];
      }
      const { data } = await updateUser({
        key: "prioritizedPrompts",
        value: newPrioritizedPrompts,
      });
      setUserState(data);
    } catch (err) {
      console.error(err);
    }
  };

  const changeUserOnboarding = async (onboarding) => {
    try {
      const updatedOnboarding = { ...userState.onboarding, ...onboarding };
      const { data } = await updateUserOnboarding(updatedOnboarding);
      setUserState(data);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    updateUserArray,
    updateUserKeyValue,
    userState,
    setUserState,
    updateCompletedPrompt,
    updateCompletedPromptsAsset,
    changeUserOnboarding,
    getCompletedPromptByPromptId,
    getSelectedAssetByPromptId,
    togglePrioritizedPrompt,
    updateCredentials,
  };
};

export default useUser;
