import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { withTheme, ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import axios from "axios";

import UserContext from "./state/UserContext";
import AppContext from "./state/AppContext";
import SettingsContext from "./state/SettingsContext";
import { getAppData, storeAppData, clearAll } from "./storage";
import HomeScreen from "./screens/HomeScreen";
import IntroScreen from "./screens/IntroScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SettingScreen from "./screens/SettingScreen";
import PromptScreen from "./screens/PromptScreen";
import CaptionsScreen from "./screens/CaptionsScreen";
import theme from "./theme";
import storageHelpers from "./helpers/storageHelpers";
import { allSettings } from "./helpers/appData";
import useUser from "./hooks/user";

const Stack = createStackNavigator();
// const isTesting = true;
// if (isTesting) {
// axios.defaults.baseURL = `https://dindongbaby.loca.lt`;
// } else {
// TODO: Add server url
//}

//rsf
function Main() {
  const user = useUser();
  const [app, setApp] = useState({});
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedSetting, setSelectedSetting] = useState({});
  const [selectedHomeScreen, setSelectedHomeScreen] = useState("prompts");
  const [fontLoaded] = useFonts({
    SFCompactRoundedBold: require("../assets/fonts/SF-Compact-Rounded-Bold.otf")
  });

  const { fetchUserData } = user;

  const fetchAppData = async () => {
    try {
      let appCacheData;
      const appData = await getAppData();
      console.log("getAppData", appData);
      if (appData && Object.keys(appData).length) {
        console.log("setApp");
        setApp(appData);
        appCacheData = appData;
      } else {
        let newApp = storageHelpers.setInitialApp;
        console.log("storeAppData");
        storeAppData(newApp);
        appCacheData = newApp;
      }
      return appCacheData;
    } catch (err) {
      console.error(err);
    }
  };

  if (!fontLoaded || !user) {
    return <AppLoading />;
  }

  const { userState } = user;
  console.log(userState);

  // CLEAR CACHE
  // clearAll();

  // return <Text>test</Text>;
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          <AppContext.Provider
            value={{
              selectedPrompt,
              setSelectedPrompt,
              app,
              selectedHomeScreen,
              setSelectedHomeScreen
            }}
          >
            <SettingsContext.Provider
              value={{ selectedSetting, setSelectedSetting, allSettings }}
            >
              <SafeAreaView style={styles.container(theme)}>
                <Stack.Navigator>
                  {userState?.unlockedPrompts?.length > 0 ? (
                    []
                  ) : (
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
            </SettingsContext.Provider>
          </AppContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    width: "100%",
    height: "100%",
    maxWidth: "600px",
    backgroundColor: theme.colors.Black
  })
});

export default withTheme(Main);
