import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import AppContext from "../state/AppContext";
import HomePrompt from "./HomePrompt";
import usePrompts from "../hooks/prompts";

function PromptsContainer({ theme }) {
  const { app } = useContext(AppContext);
  // const { prompts } = app;
  const { unlockedPrompts } = usePrompts();
  console.log(unlockedPrompts);
  return (
    <View style={styles.container(theme)}>
      <View style={styles.promptsScroll(theme)}>
        {unlockedPrompts.map(prompt => (
          <HomePrompt key={prompt?.key} prompt={prompt} />
        ))}
      </View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: "relative",
    height: "auto"
  }),
  promptsScroll: theme => ({
    width: "100%",
    flex: 1,
    flexDirection: "column"
  })
});

export default withTheme(PromptsContainer);
