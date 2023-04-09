import { useEffect, useContext, useState } from "react";
import { getToken } from "../storage";
import moment from "moment";
import { helpers } from "../helpers/helpers";
import UserContext from "../state/UserContext";
import { authenticateDevice } from "../api/auth";
import { readMe, updateUserOnboarding } from "../api/users";

// on initialize, fetch user with token
// if no token, try to refresh with just device id

const useUser = () => {
  const [userState, setUserState] = useState({});

  const authDevice = async () => {
    try {
      const user = await authenticateDevice();
      if (!!user) {
        setUserState(user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!!token && token !== "undefined") {
        try {
          const { data } = await readMe(token);
          if (!!data) {
            setUserState(data);
          }
        } catch (err) {
          console.error(err);
          await authDevice();
        }
      } else {
        await authDevice();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserKeyValue = (key, value) => {
    setUserState((prevState) => ({ ...prevState, [key]: value }));
  };

  const updateUserArray = (key, value) => {
    setUserState((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], value],
    }));
  };

  const updateCompletedPrompts = (promptId, asset) => {
    setUserState((prevState) => {
      const { completedPromptIds } = prevState;

      const completedPromptIdsIndex = completedPromptIds.indexOf(
        (p) => p.id === promptId
      );

      let newCompletedPrompt = {};
      if (completedPromptIdsIndex > -1) {
        const newCompletedPrompts = [...completedPromptIds];
        const thisAssetIndex = newCompletedPrompts[
          completedPromptIdsIndex
        ].assets?.indexOf((a) => a.assetId === asset.assetId);

        if (thisAssetIndex > -1) {
          const assets = [
            ...newCompletedPrompts[completedPromptIdsIndex].assets,
          ];
          assets[thisAssetIndex] = asset;
          newCompletedPrompts[completedPromptIdsIndex] = {
            ...newCompletedPrompts[completedPromptIdsIndex],
            selectedAsset: asset.assetId,
            assets,
          };
        } else {
          newCompletedPrompts[completedPromptIdsIndex] = {
            ...newCompletedPrompts[completedPromptIdsIndex],
            selectedAsset: asset.assetId,
            assets: [
              ...newCompletedPrompts[completedPromptIdsIndex].assets,
              asset,
            ],
          };
        }
        return {
          ...prevState,
          completedPromptIds: newCompletedPrompts,
        };
      } else {
        newCompletedPrompt = {
          id: helpers.guidGenerator("prompt-"),
          promptId,
          dateComplete: moment().toISOString(),
          selectedAsset: asset.id,
          assets: [asset],
        };

        return {
          ...prevState,
          completedPromptIds: [
            ...prevState.completedPromptIds,
            newCompletedPrompt,
          ],
        };
      }
    });
  };

  const updateCompletedPrompt = (key, value, id) => {
    let newUser = { ...userState };
    const thisPromptIndex = newUser?.completedPromptIds.findIndex(
      (chal) => chal.promptId === id
    );
    newUser.completedPromptIds[thisPromptIndex][key] = value;

    setUserState(newUser);
  };

  const getCompletedPromptByPromptId = (promptId) => {
    const completedPrompt = userState?.completedPromptIds?.find(
      (p) => p.promptId === promptId
    );
    return !!completedPrompt ? completedPrompt : {};
  };

  const getSelectedAssetByPromptId = (promptId) => {
    const completedPrompt = getCompletedPromptByPromptId(promptId);

    return (
      completedPrompt?.assets?.find(
        (a) => a.id === completedPrompt.selectedAsset
      ) || {}
    );
  };

  const sortUnlockedPromptIds = () => {
    const { prioritizedPrompts, unlockedPromptIds } = userState || {};
    if (!unlockedPromptIds || !prioritizedPrompts) return;
    // for (let i = prioritizedPrompts.length - 1; i >= 0; i--) {
    //   const id = Number(prioritizedPrompts[i]);
    //   console.log("id", id);

    //   const index = newUnlockedPromptIds.findIndex((pid) => Number(pid) === id);
    //   console.log("index", index);
    //   if (index > -1) {
    //     newUnlockedPromptIds[index] = null;
    //     newUnlockedPromptIds = [id, ...newUnlockedPromptIds];
    //   }
    // }
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

  useEffect(() => {
    const { _id } = userState || {};
    if (!_id) {
      fetchUserData();
    }
  }, [userState]);

  return {
    updateUserArray,
    updateUserKeyValue,
    userState,
    setUserState,
    updateCompletedPrompt,
    fetchUserData,
    updateCompletedPrompts,
    changeUserOnboarding,
    getCompletedPromptByPromptId,
    getSelectedAssetByPromptId,
    togglePrioritizedPrompt,
  };
};

export default useUser;
