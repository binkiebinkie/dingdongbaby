import { useContext, useEffect, useState } from "react";
import {
  assignRandomPromptToUser,
  readUnlockedPrompts,
  readLockedPrompts,
  readUnlockedPrompt,
} from "../api/prompts";
import prompts from "../prompts.json";
import UserContext from "../state/UserContext";
import useListState from "./list";
import useUser from "./user";
// import { useUserContext } from "../state/UserContext";

const usePrompts = () => {
  const { userState, setUserState } = useContext(UserContext);
  const { updateUserArray } = useUser();
  const {
    listState: unlockedPrompts,
    setListState: setUnlockedPrompts,
    fetchListState: fetchUnlockedPrompts,
  } = useListState(null, {
    create: () => {},
    read: readUnlockedPrompts,
    update: () => {},
    delete: () => {},
  });

  const {
    listState: lockedPrompts,
    setListState: setLockedPrompts,
    fetchListState: fetchLockedPrompts,
  } = useListState(null, {
    create: () => {},
    read: readLockedPrompts,
    update: () => {},
    delete: () => {},
  });

  // TODO: API handles this
  // const fetchRandomPrompt = (diff) => {
  //   const { lockedPromptIds } = userState;

  //   if (unlockedPromptIds.length === prompts.length) {
  //     console.error("not enough prompts!! make more lazy team");
  //     return;
  //   }

  //   const notAlreadyUnlockedPrompts = prompts.filter(({ id }) => {
  //     const alreadyUnlocked = unlockedPromptIds.findIndex(
  //       ({ promptId }) => Number(promptId) === Number(id)
  //     );
  //     if (alreadyUnlocked > -1) return false;
  //     return true;
  //   });

  //   const difficultyFilteredPrompts = !!diff
  //     ? notAlreadyUnlockedPrompts.filter((p) => Number(p?.difficulty) == diff)
  //     : notAlreadyUnlockedPrompts;

  //   const randomIndex = Math.floor(
  //     Math.random() *
  //       (difficultyFilteredPrompts.length === 0
  //         ? notAlreadyUnlockedPrompts.length
  //         : difficultyFilteredPrompts.length)
  //   );

  //   if (difficultyFilteredPrompts.length === 0) {
  //     console.error("no prompts left with this difficulty!!");
  //     return notAlreadyUnlockedPrompts[randomIndex];
  //   }

  //   return difficultyFilteredPrompts[randomIndex];
  // };

  const addRandomPromptToUser = async (difficulty) => {
    try {
      const { data } = await assignRandomPromptToUser({ difficulty });
      console.log(data);
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
      console.log(data);
      return data?.id;
    } catch (err) {
      console.error(err);
    }
  };

  // const getPromptsById = (ids = []) => ids.map((id) => getPromptById(id));

  // const getUnlockedPrompts = (unlockedPromptIds) => {
  //   return getPromptsById(unlockedPromptIds);
  // };

  // useEffect(() => {
  // setUnlockedPrompts(getPromptsById(userState?.unlockedPromptIds));
  // }, [userState?.unlockedPromptIds]);
  // useEffect(getUnlockedPrompts, [userState.unlockedPromptIds]);

  const allPromptsCount = prompts.length;
  const completedPrompts = prompts.slice(0, 50);

  useEffect(() => {
    console.log("ahh fetch it!!");
    fetchUnlockedPrompts();
  }, [userState.unlockedPromptIds, userState?._id]);
  useEffect(() => {
    fetchLockedPrompts();
  }, []);

  return {
    allPromptsCount,
    getPromptById,
    completedPrompts,
    lockedPrompts,
    unlockedPrompts,
    addRandomPromptToUser,
  };
};

export default usePrompts;
