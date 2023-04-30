import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import Spacer from "./styleComponents/Spacer";
import NavigationButtons from "./NavigationButtons";
import { withTheme } from "react-native-elements";

const AppBackground = ({ theme, children, hasNavigationButtons }) => (
  <ImageBackground
    source={require("../assets/AppBackground.png")}
    style={{
      height: "100%",
      width: "100%",
    }}
  >
    <SafeAreaView style={styles.safeArea(theme)}></SafeAreaView>
    <View
      style={[
        styles.scroll,
        {
          maxWidth: 768,
          width: "100%",
          paddingBottom: 64,
        },
      ]}
    >
      <ScrollView
        style={[styles.scroll]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1 }}>
          <Spacer width="100%" height={8} />
          {children}
        </View>
      </ScrollView>
    </View>
    {hasNavigationButtons ? <NavigationButtons /> : []}
  </ImageBackground>
);

const styles = StyleSheet.create({
  safeArea: (theme) => ({
    flex: 0,
    backgroundColor: "rgba(0,0,0,0)",
    paddingBottom: 0,
  }),
  scroll: {
    flexDirection: "column",
    height: "100%",
  },
});

export default withTheme(AppBackground);
