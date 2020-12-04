import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { withTheme } from "react-native-elements";
import Locked from "../assets/svgs/Locked";
import CircleBar from "./CircleBar";

function UnlockChallengesHeader({ navigation, theme }) {
  const navigateToChallenge = () => {
    console.log("navigate to challenge", navigation);
  };

  return (
    <View style={styles.cont(theme)}>
      <View style={styles.challengesCont(theme)}>
        <Text style={styles.challengesFont(theme)}>complete to unlock</Text>
        <Locked />
      </View>
      <CircleBar />
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  challengesCont: theme => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  }),
  cont: theme => ({
    position: "relative",
    backgroundColor: "red"
  }),
  challengesFont: theme => ({
    fontSize: 30,
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

export default withTheme(UnlockChallengesHeader);
