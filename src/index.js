import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { withTheme, ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import AppContext from "./state/AppContext";
import SettingsContext from "./state/SettingsContext";
import UserContext from "./state/UserContext";
import { clearAll } from "./storage";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import IntroScreen from "./screens/IntroScreen";
// import SettingsScreen from "./screens/Settings/SettingsScreen";
import SettingScreen from "./screens/Settings/SettingScreen";
import PromptScreen from "./screens/PromptScreen";
import CaptionsScreen from "./screens/CaptionsScreen";
import SettingsNavigator from "./screens/Settings/SettingsNavigator";
import theme from "./theme";
import { allSettings } from "./helpers/appData";
import useTranslation from "./hooks/translations";
import { deleteUser, readMe } from "./api/users";
import { getToken } from "./storage";
import { authenticateDevice } from "./api/auth";

const Stack = createStackNavigator();
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

  // glycolic acid
  // Hibiclens
  useEffect(() => {
    initializeTranslation();
  }, []);

  // CLEAR CACHE
  const clearEverything = async () => {
    await deleteUser(userState?._id);
    clearAll();
  };
  useEffect(() => {
    // clearEverything();
    if (!userState?._id) {
      fetchUserData();
    }
  }, [userState?._id]);

  console.log("JIQWFJQWIEFJEWFQIFN!(@N@!(", userState);
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
          <UserContext.Provider value={{ userState, setUserState }}>
            <SettingsContext.Provider
              value={{ selectedSetting, setSelectedSetting, allSettings }}
            >
              <>
                {!fontLoaded || !userState?._id ? (
                  <Text>Loading</Text>
                ) : (
                  <Stack.Navigator
                    initialRouteName={
                      !userState?.onboarding?.viewedIntro ? "Intro" : "Home"
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
                      key={userState?.completedPrompts?.length}
                      component={PromptScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Captions"
                      component={CaptionsScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="SettingsNavigator"
                      component={SettingsNavigator}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                )}
              </>
            </SettingsContext.Provider>
          </UserContext.Provider>
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
