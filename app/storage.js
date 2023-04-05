import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY_USER = "@ddb_user";
const STORAGE_KEY_APP = "@ddb_app";
const STORAGE_KEY_TOKEN = "@ddb_token";

export const storeUserData = async (userState) => {
  try {
    if (userState && Object.keys(userState).length) {
      const jsonUserState = JSON.stringify(userState);
      console.log("storeUserData ", jsonUserState);

      await AsyncStorage.setItem(STORAGE_KEY_USER, jsonUserState).catch((err) =>
        console.log(err)
      );
    }
  } catch (e) {
    console.log("DANGIT! There was an error saving: ", e);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_USER).catch(
      (err) => console.log(err)
    );
    console.log("getUserData jsonValue", jsonValue);
    return jsonValue !== null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.log("DANGIT! There was an error getting data: ", e);
  }
};

export const storeAppData = async (appState) => {
  try {
    const jsonAppState = JSON.stringify(appState);
    console.log("storeAppData");

    await AsyncStorage.setItem(STORAGE_KEY_APP, jsonAppState).catch((err) =>
      console.log(err)
    );
  } catch (e) {
    console.log("DANGIT! There was an error saving storeAppData: ", e);
    // saving error
  }
};

export const getAppData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_APP).catch((err) =>
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

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_TOKEN, token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY_TOKEN);
  } catch (error) {
    console.error("Error saving token:", error);
    return null;
  }
};
