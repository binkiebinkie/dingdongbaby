import React, { useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, SafeAreaView } from "react-native";
import { withTheme, ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import AppContext from "./state/AppContext";
import SettingsContext from "./state/SettingsContext";
import UserContext from "./state/UserContext";
import { clearAll } from "./storage";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import IntroScreen from "./screens/IntroScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SettingScreen from "./screens/SettingScreen";
import PromptScreen from "./screens/PromptScreen";
import CaptionsScreen from "./screens/CaptionsScreen";
import theme from "./theme";
import { allSettings } from "./helpers/appData";
import { helpers } from "./helpers/helpers";

import useUser from "./hooks/user";
import useTranslation from "./hooks/translations";
import { deleteUser } from "./api/users";

const Stack = createStackNavigator();
// const isTesting = true;
// if (isTesting) {
// axios.defaults.baseURL = `https://dindongbaby.loca.lt`;
// } else {
// TODO: Add server url
//}

// const INITIAL_USER = {
//   id: "",
//   dateSignedUp: moment(),
//   email: "",
//   password: "",
//   credits: 0,
//   lastUpdated: moment(),
//   completedPrompts: [],
//   unlockedPromptIds: [], // array of photo ids
//   sharingLinks: [],
//   name: "",
//   gender: "",
//   babies: [{ name: "", gender: "", dob: "" }],
//   prioritizedPrompts: [], // array of starred prompts, sort to top
// };

const DingDongBaby = () => {
  const [app, setApp] = useState({});
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedSetting, setSelectedSetting] = useState({});
  const [userState, setUserState] = useState({});
  const [selectedHomeScreen, setSelectedHomeScreen] = useState("prompts");
  const [fontLoaded] = useFonts({
    SFCompactRoundedBold: require("../assets/fonts/SF-Compact-Rounded-Bold.otf"),
  });
  const { initializeTranslation } = useTranslation();
  console.log("userState", userState);
  // const { fetchUserData } = user;

  // const fetchAppData = async () => {
  //   try {
  //     let appCacheData;
  //     const appData = await getAppData();
  //     console.log("getAppData", appData);
  //     if (appData && Object.keys(appData).length) {
  //       console.log("setApp");
  //       setApp(appData);
  //       appCacheData = appData;
  //     } else {
  //       let newApp = storageHelpers.setInitialApp;
  //       console.log("storeAppData");
  //       storeAppData(newApp);
  //       appCacheData = newApp;
  //     }
  //     return appCacheData;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  useEffect(() => {
    initializeTranslation();
  }, []);

  // CLEAR CACHE
  const clearEverything = async () => {
    await deleteUser(userState?._id);
    clearAll();
  };
  // useEffect(() => {
  //   clearEverything();
  // }, [userState?._id]);

  if (!fontLoaded || !userState) {
    return <AppLoading />;
  }

  //   return <Text>asdfasdfasdfdsasfsd</Text>;
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            selectedPrompt,
            setSelectedPrompt,
            app,
            selectedHomeScreen,
            setSelectedHomeScreen,
          }}
        >
          <SettingsContext.Provider
            value={{ selectedSetting, setSelectedSetting, allSettings }}
          >
            <UserContext.Provider value={{ userState, setUserState }}>
              <SafeAreaView style={styles.container(theme)}>
                <Stack.Navigator
                  initialRouteName={
                    userState?.onboarding?.viewedIntro ? "Home" : "Intro"
                  }
                >
                  {!userState?.onboarding?.viewedIntro && (
                    <Stack.Screen
                      name="Intro"
                      component={IntroScreen}
                      options={{ headerShown: false }}
                    />
                  )}
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Prompt"
                    component={PromptScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Setting"
                    component={SettingScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Captions"
                    component={CaptionsScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </SafeAreaView>
            </UserContext.Provider>
          </SettingsContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.Black,
  }),
});

export default withTheme(DingDongBaby);
