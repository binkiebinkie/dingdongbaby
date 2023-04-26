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
  <SafeAreaView style={styles.safeArea(theme)}>
    <ImageBackground
      source={require("../assets/AppBackground.png")}
      style={[
        styles.scroll,
        {
          resizeMode: "cover",
          height: "100%",
          display: "flex",
          alignItems: "center",
        },
      ]}
    >
      <View style={[styles.scroll, { maxWidth: 768, width: "100%" }]}>
        <ScrollView
          style={[styles.scroll]}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Spacer width={"100%"} height={32} />
            {children}
          </View>
        </ScrollView>
      </View>
      {hasNavigationButtons ? <NavigationButtons /> : []}
    </ImageBackground>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: (theme) => ({
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.BGBeige,
    minHeight: "100%",
    minWidth: "100%",
    justifyContent: "center",
  }),
  scroll: {
    flexDirection: "column",
    // flex: 1,
    height: "100%",
    marginBottom: 32,
  },
});

export default withTheme(AppBackground);
