import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import AppContext from "../state/AppContext";
import GradientButton from "./styleComponents/GradientButton";
import CircleBar from "./CircleBar";

import { withTheme } from "react-native-elements";
import { helpers } from "../helpers/helpers";
import useTranslation from "../hooks/translations";

function UpsellContainer({ theme, prompt }) {
  const { app } = useContext(AppContext);
  const { t } = useTranslation();
  // const navigation = useNavigation();

  // const navigateToPrompt = () => {
  //   console.log("navigate to prompt", navigation);
  //   setSelectedPrompt(prompt.id);
  //   return navigation.navigate("Prompt");
  // };

  // TODO: refactor color of difficulty
  return (
    <View style={styles.cont(theme)}>
      <GradientButton copy="unlock prompts" />
      <View style={styles.spacer}></View>
      <CircleBar />
      <Text style={styles.comment(theme)}>
        {t([
          "settings/cta--hint1",
          "settings/cta--hint2",
          "settings/cta--hint3",
          "settings/cta--hint4"
        ])}
      </Text>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  cont: theme => ({
    position: "relative",
    width: "100%",
    borderRadius: 12,
    backgroundColor: theme.colors.PureWhite,
    padding: 12,
    marginBottom: 4
  }),
  spacer: { width: "100%", height: 12 },
  comment: theme => ({
    paddingTop: 12,
    fontSize: 12,
    color: theme.colors.G6,
    textAlign: "center"
  })
});

export default withTheme(UpsellContainer);
