import { useState, useEffect, useId } from "react";
import { storeUserData, getUserData } from "../storage";
import moment from "moment";
import { uniqueId } from "lodash";

const initialUser = {
  id: "",
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
  babies: [{ name: "", gender: "", dob: "" }]
};

// completedPrompts: [
//   {
//     id: "",
//     promptId: "",
//     images: [
//       {
//         id: "",
//         assetId: "",
//         width: "",
//         photoReferenceId: ""
//       }
//     ]
//   }
// ];

const useUser = () => {
  const [userState, setUserState] = useState({});

  const fetchUserData = async () => {
    try {
      const userData = await getUserData();
      console.log("fetching userData", userData);

      if (!!userData?.id) {
        console.log("setUserState");
        setUserState(userData);
      } else {
        setUserState({ ...initialUser, id: uniqueId("user-") });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserKeyValue = (key, value) =>
    setUserState(prevState => ({ ...prevState, [key]: value }));

  const updateUserArray = (key, value) =>
    setUserState(prevState => ({
      ...prevState,
      [key]: [...prevState[key], value]
    }));

  const updateCompletedPrompts = (promptId, asset) => {
    setUserState(prevState => {
      const { completedPrompts } = prevState;
      const completedPromptsIndex = completedPrompts.indexOf(
        p => p.id === promptId
      );
      let newCompletedPrompt = {};
      if (completedPromptsIndex > -1) {
        const newCompletedPrompts = [...completedPrompts];
        const thisAssetIndex = newCompletedPrompts[
          completedPromptsIndex
        ].assets?.indexOf(a => a.assetId === asset.assetId);
        if (thisAssetIndex > -1) {
          const assets = [...newCompletedPrompts[completedPromptsIndex].assets];
          assets[thisAssetIndex] = asset;
          newCompletedPrompts[completedPromptsIndex] = {
            ...newCompletedPrompts[completedPromptsIndex],
            selectedAsset: asset.assetId,
            assets
          };
        } else {
          newCompletedPrompts[completedPromptsIndex] = {
            ...newCompletedPrompts[completedPromptsIndex],
            selectedAsset: asset.assetId,
            assets: [
              ...newCompletedPrompts[completedPromptsIndex].assets,
              asset
            ]
          };
        }
        return {
          ...prevState,
          completedPrompts: newCompletedPrompts
        };
      } else {
        newCompletedPrompt = {
          id: uniqueId("prompt-"),
          promptId,
          dateComplete: moment().toISOString(),
          selectedAsset: asset.id,
          assets: [asset]
        };
        return {
          ...prevState,
          completedPrompts: [...prevState.completedPrompts, newCompletedPrompt]
        };
      }
    });
  };

  const updateCompletedPrompt = (key, value, id) => {
    let newUser = JSON.parse(JSON.stringify(userState));
    const thisPromptIndex = newUser.completedPrompts.findIndex(
      chal => chal.promptId === id
    );
    newUser.completedPrompts[thisPromptIndex][key] = value;
    setUserState(newUser);
  };

  useEffect(() => {
    const { id } = userState;
    console.log("ididid", id);
    if (id) {
      console.log("storing");
      storeUserData(userState);
    }
  }, [userState]);

  useEffect(fetchUserData, []);

  return {
    updateUserArray,
    updateUserKeyValue,
    userState,
    updateCompletedPrompt,
    fetchUserData,
    updateCompletedPrompts
  };
};

export default useUser;
