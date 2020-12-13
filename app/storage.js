import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "@ddb-user";
const STORAGE_KEY_APP = "@ddb-app";
export const storeUserData = async userState => {
  try {
    if (userState && Object.keys(userState).length) {
      const jsonAppState = JSON.stringify(userState);
      console.log("storeUserData ");

      await AsyncStorage.setItem(STORAGE_KEY, jsonAppState).catch(err =>
        console.log(err)
      );
    }
  } catch (e) {
    console.log("DANGIT! There was an error saving: ", e);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY).catch(err =>
      console.log(err)
    );
    console.log("getUserData jsonValue");
    return jsonValue !== null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.log("DANGIT! There was an error getting data: ", e);
  }
};

export const storeAppData = async appState => {
  try {
    const jsonAppState = JSON.stringify(appState);
    console.log("storeAppData");

    await AsyncStorage.setItem(STORAGE_KEY_APP, jsonAppState).catch(err =>
      console.log(err)
    );
  } catch (e) {
    console.log("DANGIT! There was an error saving storeAppData: ", e);
    // saving error
  }
};

export const getAppData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_APP).catch(err =>
      console.log(err)
    );
    console.log("getAppData jsonValue");
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.log("DANGIT! There was an error getting data getAppData: ", e);

    // error reading value
  }
};

export const clearAll = async () => {
  try {
    console.log("CLEARNING THE DATA BYEEEEEEE");
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log("Done. CLEARNING THE DATA BaYbEEEEEEE");
};
