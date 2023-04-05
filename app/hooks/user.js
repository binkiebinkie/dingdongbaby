import { useEffect, useContext } from "react";
import { storeUserData, storeToken, getToken } from "../storage";
import moment from "moment";
import { helpers } from "../helpers/helpers";
import UserContext from "../state/UserContext";
import { authenticateDevice } from "../api";
import { readMe, updateUserOnboarding } from "../api/users";

// on initialize, fetch user with token
// if no token, try to refresh with just device id

const initialUser = {
  _id: "",
  dateSignedUp: moment(),
  email: "",
  password: "",
  credits: 0,
  lastUpdated: moment(),
  completedPrompts: [],
  unlockedPrompts: [], // array of photo ids
  sharingLinks: [],
  name: "",
  gender: "",
  babies: [{ name: "", gender: "", dob: "" }],
  uid: "",
  onboarding: {
    viewedIntro: false,
  },
};

const useUser = () => {
  const { userState, setUserState } = useContext(UserContext);

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      console.log("fetchingToken", token);
      if (!!token && token !== "undefined") {
        const { data } = await readMe(token);
        console.log("{data}", data);
        if (!!data) {
          setUserState(data);
        }
      } else {
        const resp = await authenticateDevice();
        console.log("respsresp", resp);
        const { user } = resp;
        console.log("fetchung user", user);
        setUserState(user);
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
      const { completedPrompts } = prevState;

      const completedPromptsIndex = completedPrompts.indexOf(
        (p) => p.id === promptId
      );

      let newCompletedPrompt = {};
      if (completedPromptsIndex > -1) {
        const newCompletedPrompts = [...completedPrompts];
        const thisAssetIndex = newCompletedPrompts[
          completedPromptsIndex
        ].assets?.indexOf((a) => a.assetId === asset.assetId);

        if (thisAssetIndex > -1) {
          const assets = [...newCompletedPrompts[completedPromptsIndex].assets];
          assets[thisAssetIndex] = asset;
          newCompletedPrompts[completedPromptsIndex] = {
            ...newCompletedPrompts[completedPromptsIndex],
            selectedAsset: asset.assetId,
            assets,
          };
        } else {
          newCompletedPrompts[completedPromptsIndex] = {
            ...newCompletedPrompts[completedPromptsIndex],
            selectedAsset: asset.assetId,
            assets: [
              ...newCompletedPrompts[completedPromptsIndex].assets,
              asset,
            ],
          };
        }
        return {
          ...prevState,
          completedPrompts: newCompletedPrompts,
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
          completedPrompts: [...prevState.completedPrompts, newCompletedPrompt],
        };
      }
    });
  };

  const updateCompletedPrompt = (key, value, id) => {
    let newUser = { ...userState };
    const thisPromptIndex = newUser?.completedPrompts.findIndex(
      (chal) => chal.promptId === id
    );
    newUser.completedPrompts[thisPromptIndex][key] = value;

    setUserState(newUser);
  };

  const getCompletedPromptByPromptId = (promptId) => {
    const completedPrompt = userState?.completedPrompts?.find(
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
    console.log(userState);
    if (!_id) {
      fetchUserData();
    }
  }, [userState]);

  // useEffect(() => {
  //   console.log("i keep firing");
  //   fetchUserData();
  // }, []);

  return {
    updateUserArray,
    updateUserKeyValue,
    userState,
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
