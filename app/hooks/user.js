import { useState, useEffect, useId } from "react";
import { storeUserData, getUserData } from "../storage";
import moment from "moment";
import { initialUser } from "../helpers/appData";

const useUser = () => {
  const [userState, setUserState] = useState({});
  const uniqueId = useId();

  const fetchUserData = async () => {
    try {
      const userData = await getUserData();
      console.log("fetching userData", userData);

      if (!!userData?.id) {
        console.log("setUserState");
        setUserState(userData);
      } else {
        setUserState({ ...initialUser, id: uniqueId });
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
    fetchUserData
  };
};

export default useUser;
