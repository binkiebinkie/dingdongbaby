import { useContext, useEffect } from "react";
import { getToken } from "../storage";
import { authenticateDevice } from "../api/auth";
import {
  readMe,
  updateUserCompletedPrompt,
  updateUserCompletedPromptAsset,
  updateUserOnboarding,
  updateUserCredentials,
} from "../api/users";
import UserContext from "../state/UserContext";

const useUser = () => {
  const { userState, setUserState } = useContext(UserContext);
  // console.log("userState", userState);
  // const authDevice = async () => {
  //   try {
  //     const user = await authenticateDevice();
  //     if (!!user) {
  //       setUserState(user);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const fetchUserData = async () => {
  //   try {
  //     const token = await getToken();
  //     if (!!token && token !== "undefined") {
  //       try {
  //         const { data } = await readMe(token);
  //         if (!!data) {
  //           setUserState(data);
  //         }
  //       } catch (err) {
  //         console.error(err);
  //         await authDevice();
  //       }
  //     } else {
  //       await authDevice();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
      console.log("data", data);

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
      console.log("datadatadatadata", data);
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

  const sortUnlockedPromptIds = () => {
    // const { userState } = useContext(UserContext);

    const { prioritizedPrompts, unlockedPromptIds } = userState || {};
    if (!unlockedPromptIds || !prioritizedPrompts) return;

    setUserState((prevState) => ({
      ...prevState,
      unlockedPromptIds: prevState.unlockedPromptIds?.reduce(
        (acc, currentValue) => {
          const isPrioritized = prevState?.prioritizedPrompts?.findIndex(
            (pid) => pid === Number(currentValue)
          );
          if (isPrioritized > -1) return [currentValue, ...acc];
          return [...acc, currentValue];
        },
        []
      ),
    }));
  };

  const togglePrioritizedPrompt = async (promptId) => {
    const { prioritizedPrompts } = userState;
    if (!prioritizedPrompts) return;
    let newPrioritizedPrompts = [...prioritizedPrompts];
    const id = Number(promptId);
    const index = newPrioritizedPrompts.findIndex((pid) => Number(id) === pid);
    if (index > -1) {
      newPrioritizedPrompts = newPrioritizedPrompts.filter(
        (pp) => Number(pp) !== id
      );
    } else {
      newPrioritizedPrompts = [...newPrioritizedPrompts, id];
    }

    setUserState((prevState) => ({
      ...prevState,
      prioritizedPrompts: newPrioritizedPrompts.filter((f) => !!f),
    }));
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
  useEffect(sortUnlockedPromptIds, [userState?.prioritizedPrompts]);

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
