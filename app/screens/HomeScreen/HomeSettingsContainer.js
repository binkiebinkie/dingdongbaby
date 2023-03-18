import { withTheme } from "react-native-elements";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import SettingsBaby from "../../assets/svgs/settingsBaby";

function HomeSettingsContainer({ theme, navigation }) {
  const navigateToSettings = () => navigation.navigate("Settings");
  return (
    <View style={styles.container(theme)}>
      <Pressable onPress={() => navigateToSettings()}>
        <SettingsBaby />
      </Pressable>
    </View>
  );
} 

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 16,
    paddingRight: 16
  }),
  top: theme => ({})
});

export default withTheme(HomeSettingsContainer);
