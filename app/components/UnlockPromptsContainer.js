import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import AppContext from "../state/AppContext";
import HomePrompt from "./HomePrompt";
import UpsellContainer from "./UpsellContainer";
import UnlockPromptsHeader from "./UnlockPromptsHeader";
import usePrompts from "../hooks/prompts";

function UnlockPromptsContainer({ theme }) {
  const { lockedPrompts } = usePrompts();

  return (
    <View style={styles.container(theme)}>
      <UnlockPromptsHeader />
      <UpsellContainer />
      <View style={styles.promptsScroll(theme)}>
        {lockedPrompts.map(prompt => (
          <HomePrompt key={prompt.id} prompt={prompt} locked={true} />
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

export default withTheme(UnlockPromptsContainer);
