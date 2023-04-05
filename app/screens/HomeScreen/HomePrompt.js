import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../state/AppContext";
import PromptDetails from "../../components/PromptDetails";

import { withTheme } from "react-native-elements";

function HomePrompt({ theme, prompt, locked }) {
  const { setSelectedPrompt } = useContext(AppContext);
  const navigation = useNavigation();

  const navigateToPrompt = () => {
    setSelectedPrompt(prompt.id);
    return navigation.navigate("Prompt");
  };
  // TODO: refactor color of difficulty
  return (
    <Pressable onPress={() => (locked ? null : navigateToPrompt())}>
      <View style={styles.container(theme)}>
        <PromptDetails prompt={prompt} isHomePrompt={true} />
      </View>
    </Pressable>
  );
}

//rnss
const styles = StyleSheet.create({
  container: (theme) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 12,
    backgroundColor: theme.colors.PureWhite,
    padding: 12,
    marginBottom: 4,
  }),
});

export default withTheme(HomePrompt);
