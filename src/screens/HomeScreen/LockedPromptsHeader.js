import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { withTheme } from "react-native-elements";
import Locked from "../../assets/svgs/Locked";
import CircleBar from "../../components/CircleBar";

function LockedPromptsHeader({ navigation, theme }) {
  const navigateToPrompt = () => {
    console.log("navigate to prompt", navigation);
  };

  return (
    <View style={styles.cont(theme)}>
      <View style={styles.promptsCont(theme)}>
        <Text style={styles.promptsFont(theme)}>complete to unlock</Text>
        <Locked />
      </View>
      <CircleBar />
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  promptsCont: (theme) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  }),
  cont: (theme) => ({
    position: "relative",
    width: "100%",
    marginTop: 38,
    marginBottom: 12,
  }),
  promptsFont: (theme) => ({
    fontSize: 18,
    fontFamily: "SFCompactRoundedBold",
    textTransform: "lowercase",
    color: theme.colors.G6,
  }),
  checkCont: (theme) => ({
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.G2,
    borderRadius: 50,
    marginRight: 8,
  }),
  checkCount: (theme) => ({
    fontSize: 14,
    color: theme.colors.G6,
  }),
  totalCont: (theme) => ({
    flexDirection: "row",
    alignItems: "center",
  }),
});

export default withTheme(LockedPromptsHeader);
