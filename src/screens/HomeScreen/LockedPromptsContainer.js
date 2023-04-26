import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import HomePrompt from "./HomePrompt";
import UpsellContainer from "../../components/UpsellContainer";
import LockedPromptsHeader from "./LockedPromptsHeader";
import usePrompts from "../../hooks/prompts";

function LockedPromptsContainer({ theme }) {
  const { lockedPrompts } = usePrompts();

  return (
    <View style={styles.container(theme)}>
      <LockedPromptsHeader />
      <UpsellContainer />
      <View style={styles.promptsScroll(theme)}>
        {lockedPrompts.results?.map((prompt) => (
          <HomePrompt key={prompt.id} prompt={prompt} locked={true} />
        ))}
      </View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: (theme) => ({
    position: "relative",
    height: "auto",
  }),
  promptsScroll: (theme) => ({
    width: "100%",
    flex: 1,
    flexDirection: "column",
  }),
});

export default withTheme(LockedPromptsContainer);
