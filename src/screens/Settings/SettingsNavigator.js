import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { withTheme } from "react-native-elements";
import Login from "./Login";
import Babies from "./Babies";
import Sharing from "./Sharing";
import Language from "./Language";
import SettingsScreen from "./SettingsScreen";

const Stack = createStackNavigator();
const SettingsNavigator = () => (
  <Stack.Navigator initialRouteName="Settings">
    <Stack.Screen
      options={{ headerShown: false }}
      name="Settings"
      component={SettingsScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={Login}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Babies"
      component={Babies}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Sharing"
      component={Sharing}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Language"
      component={Language}
    />
  </Stack.Navigator>
);

export default withTheme(SettingsNavigator);
