import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { withTheme } from "react-native-elements";

import AppContext from "../state/AppContext";
import AppBackground from "../components/AppBackground";
import CircleBar from "../components/CircleBar";
import RadioButton from "../components/styleComponents/RadioButton";
import Spacer from "../components/styleComponents/Spacer";
import TextG616 from "../components/styleComponents/TextG616";
import TextG916 from "../components/styleComponents/TextG916";
import HeaderCloseBar from "../components/HeaderCloseBar";
import GradientButton from "../components/styleComponents/GradientButton";
import { helpers } from "../helpers/helpers";
import usePrompts from "../hooks/prompts";
import useUser from "../hooks/user";

//rsf
function CaptionsScreen({ navigation, theme }) {
  const { updateCompletedPrompt } = useUser();
  const { selectedPrompt } = useContext(AppContext);
  const { getPromptById } = usePrompts();
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [customText, setCustomText] = useState("");
  const prompt = getPromptById(selectedPrompt);
  const { id, captions } = prompt;

  useEffect(() => {
    if (selectedCaption !== null) {
      setCustomText(captions[selectedCaption]);
    }
  }, [selectedCaption]);

  const navigateToPrompt = () => {
    updateCompletedPrompt("caption", customText, id);
    navigation.navigate("Prompt");
  };

  return (
    <AppBackground>
      <View style={styles.cont}>
        <HeaderCloseBar
          copy={`${helpers.numberToThreeDigits(id)} - set caption`}
          navigateTo="Prompt"
        />
        <View style={styles.contentContainer}>
          {captions.map((caption, i) => (
            <Pressable
              style={styles.captionCont(theme)}
              key={caption}
              onPress={() => setSelectedCaption(i)}
            >
              <TextG916 copy={caption} />
              <RadioButton
                addStyles={{ marginLeft: 12 }}
                selected={selectedCaption === i ? true : false}
              />
            </Pressable>
          ))}
          <Spacer width="100%" height={20} />
          <CircleBar />
          <Spacer width="100%" height={24} />
          <TextG616 addStyles={{ marginBottom: 8 }} copy="edit caption" />
          <TextInput
            style={styles.textInput(theme)}
            multiline={true}
            value={customText}
            placeholder="or add a custom caption..."
            placeholderTextColor={theme.colors.G5}
            onChangeText={(text) => {
              setSelectedCaption(null);
              setCustomText(text);
            }}
          />
        </View>
        <View style={styles.buttonCont}>
          {customText && customText.length > 0 ? (
            <GradientButton copy="set caption" onPress={navigateToPrompt} />
          ) : (
            []
          )}
        </View>
      </View>
    </AppBackground>
  );
}

//rnss
const styles = StyleSheet.create({
  buttonCont: {
    width: "100%",
    paddingBottom: 16,
    paddingTop: 16,
  },
  captionCont: (theme) => ({
    flexDirection: "row",
    backgroundColor: theme.colors.PureWhite,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 4,
  }),
  cont: {
    paddingLeft: 16,
    paddingRight: 16,
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    height: "100%",
    flex: 1,
  },
  textInput: (theme) => ({
    width: "100%",
    padding: 12,
    backgroundColor: theme.colors.PureWhite,
    minHeight: 250,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.G3,
    color: theme.colors.G9,
    textAlignVertical: "top",
  }),
  // cardContainer: theme => ({
  //   backgroundColor: "white",
  //   borderRadius: 12,
  //   width: "100%",
  //   padding: 12
  // }),
  // closeContainer: {
  //   width: "100%",
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   marginBottom: 24
  // },
  // desc: theme => ({ fontSize: 20, color: theme.colors.G10, paddingBottom: 20 }),
  // detailsContainer: theme => ({
  //   flexDirection: "row",
  //   width: "100%"
  // }),
  // gradientLine: theme => ({
  //   height: 4,
  //   borderRadius: 8,
  //   width: "100%",
  //   marginTop: 12,
  //   marginBottom: 24
  // }),
  // imageStyles: theme => ({
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: 50,
  //   height: 50,
  //   resizeMode: "contain"
  // }),
  // navigationButtons: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingBottom: 16,
  //   paddingTop: 12
  // },
  // navigationButton: theme => ({
  //   flexDirection: "row",
  //   alignItems: "center",
  //   padding: 12,
  //   backgroundColor: theme.colors.G1,
  //   width: "49%",
  //   borderRadius: 8
  // }),
  // navigationButtonText: theme => ({
  //   color: theme.colors.G6,
  //   fontSize: 16,
  //   marginLeft: 8
  // }),
  // safeArea: theme => ({
  //   backgroundColor: theme.colors.Black,
  //   flex: 1
  // }),
  // svgContainer: theme => ({
  //   width: 46,
  //   height: 46,
  //   backgroundColor: theme.colors.PureWhite,
  //   borderRadius: 6,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 4
  // }),

  // alertContainer: theme => ({
  //   borderRadius: 8,
  //   marginTop: 4,
  //   padding: 4,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   width: "100%"
  // }),
  // alertText: theme => ({
  //   fontSize: 12,
  //   flex: 1
  // }),
  // photoContainer: theme => ({
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderWidth: 2,
  //   borderColor: theme.colors.G3,
  //   borderStyle: "dashed",
  //   flex: 1,
  //   borderRadius: 12,
  //   marginBottom: 12
  // }),
  // tip: theme => ({
  //   width: "100%",
  //   padding: 4,
  //   background: "lightblue"
  // }),
  // tipContainer: theme => ({ backgroundColor: theme.colors.Blue1 }),
  // tipText: theme => ({
  //   color: theme.colors.Blue3
  // }),
  // warning: theme => ({
  //   width: "100%",
  //   padding: 4,
  //   background: "gold"
  // }),
  // warningContainer: theme => ({
  //   backgroundColor: theme.colors.Yellow1
  // }),
  // warningText: theme => ({
  //   color: theme.colors.Yellow3
  // })
});

export default withTheme(CaptionsScreen);
