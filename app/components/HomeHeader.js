import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { withTheme } from "react-native-elements";
import Checkmark from "../assets/svgs/Checkmark";
import CircleBar from "./CircleBar";

function HomeHeader({
  navigation,
  theme,
  copy,
  allPromptsCount,
  unlockedCount
}) {
  const navigateToPrompt = () => {
    console.log("navigate to prompt", navigation);
  };

  return (
    <View style={styles.cont(theme)}>
      <View style={styles.promptsCont(theme)}>
        <Text style={styles.promptsFont(theme)}>{copy}</Text>
        <View style={styles.totalCont(theme)}>
          <View style={styles.checkCont(theme)}>
            <Checkmark stroke={theme.colors.G6} />
          </View>
          <Text style={styles.checkCount(theme)}>
            {unlockedCount}/{allPromptsCount}
          </Text>
        </View>
      </View>
      <CircleBar
        numPromptsComplete={unlockedCount}
        numPrompts={allPromptsCount}
      />
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  promptsCont: theme => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }),
  cont: theme => ({
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16
  }),
  promptsFont: theme => ({
    fontSize: 32,
    letterSpacing: 0.374,
    lineHeight: 42,
    color: theme.colors.G7,
    fontFamily: "SFCompactRoundedBold",
    textTransform: "lowercase"
  }),
  checkCont: theme => ({
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.G2,
    borderRadius: 50,
    marginRight: 8
  }),
  checkCount: theme => ({
    fontSize: 14,
    color: theme.colors.G6
  }),
  totalCont: theme => ({
    flexDirection: "row",
    alignItems: "center"
  })
});

export default withTheme(HomeHeader);
