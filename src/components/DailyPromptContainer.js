import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { withTheme } from "react-native-elements";

function DailyPromptContainer({ theme }) {
  return (
    <View style={styles.container(theme)}>
      <Text>Daily Prompt Container</Text>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: "relative"
  }),
  top: theme => ({})
});

export default withTheme(DailyPromptContainer);
