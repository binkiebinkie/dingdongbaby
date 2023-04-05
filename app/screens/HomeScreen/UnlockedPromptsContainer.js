import React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme } from "react-native-elements";
import HomePrompt from "./HomePrompt";
import usePrompts from "../../hooks/prompts";

function UnlockedPromptsContainer({ theme }) {
  const { unlockedPrompts } = usePrompts();
  console.log("unlockedPrompts", unlockedPrompts);
  return (
    <View style={styles.container(theme)}>
      <View style={styles.promptsScroll(theme)}>
        {unlockedPrompts?.results?.map((prompt) => (
          <HomePrompt key={prompt?.key} prompt={prompt} />
        ))}
      </View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: () => ({
    position: "relative",
    height: "auto",
  }),
  promptsScroll: () => ({
    width: "100%",
    flex: 1,
    flexDirection: "column",
  }),
});

export default withTheme(UnlockedPromptsContainer);
