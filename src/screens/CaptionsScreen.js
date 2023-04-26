import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { withTheme } from "react-native-elements";

import AppContext from "../state/AppContext";
import AppBackground from "../components/AppBackground";
import CircleBar from "../components/CircleBar";
import Spacer from "../components/styleComponents/Spacer";
import HeaderCloseBar from "../components/HeaderCloseBar";
import { helpers } from "../helpers/helpers";
import useUser from "../hooks/user";
import useTranslation from "../hooks/translations";
import RadioButton from "../components/styleComponents/RadioButton";
import BlueButtonPrimary from "../components/styleComponents/BlueButtonPrimary";
import BlueButtonSecondary from "../components/styleComponents/BlueButtonSecondary";
import Overlay from "../components/styleComponents/Overlay";
import theme from "../theme";
import TextBlue3 from "../components/styleComponents/TextBlue3";

//rsf
function CaptionsScreen({ navigation, theme }) {
  const { updateCompletedPrompt } = useUser();
  const { selectedPrompt } = useContext(AppContext);
  const { getCompletedPromptByPromptId } = useUser();
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [editableCaptions, setEditableCaptions] = useState([]);
  const [overlay, setOverlay] = useState({ open: false, caption: "" });
  const { captions } = selectedPrompt;
  const { t } = useTranslation();

  const navigateToPrompt = async () => {
    await updateCompletedPrompt(
      "caption",
      editableCaptions[selectedCaption].caption,
      selectedPrompt.id
    );
    navigation.navigate("Prompt");
  };

  const initializeCaptions = async () => {
    try {
      const completedPrompt = await getCompletedPromptByPromptId(
        selectedPrompt.id
      );

      const newCaptions = [
        ...captions.map((caption) => ({
          caption,
          height: "auto",
        })),
        ...(!!completedPrompt?.caption
          ? [{ caption: completedPrompt.caption || "", height: "auto" }]
          : []),
      ];
      setEditableCaptions(newCaptions);
      if (!!completedPrompt?.caption)
        setSelectedCaption(newCaptions.length - 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (captions.length > 0) {
      initializeCaptions();
    }
  }, [captions]);

  return (
    <AppBackground>
      <View style={styles.cont}>
        <HeaderCloseBar
          copy={t("photo/captions/title", {
            id: helpers.numberToThreeDigits(selectedPrompt?.id),
          })}
          navigateTo="Prompt"
        />
        <View style={styles.contentContainer}>
          {editableCaptions?.map(({ caption }, i) => (
            <View key={caption + i} style={{ paddingBottom: 24 }}>
              <Pressable
                style={styles.captionCont(theme)}
                onPress={() => setSelectedCaption(i)}
              >
                <Text style={styles.caption(theme)}>{caption}</Text>
                <RadioButton selected={i === selectedCaption} />
              </Pressable>
              {i !== editableCaptions.length - 1 && <CircleBar />}
            </View>
          ))}
          <Pressable
            onPress={() => {
              setOverlay((prevState) => ({ ...prevState, open: true }));
              setSelectedCaption(null);
            }}
          >
            <TextBlue3
              addStyles={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
              copy={`+ ${t("photo/captions/add-custom-caption")}`}
            />
          </Pressable>
          <Spacer width="100%" height={24} />
        </View>
        {selectedCaption !== null ? (
          <View style={styles.buttonCont}>
            <BlueButtonSecondary
              copy={t("photo/captions/edit-caption")}
              addStyles={{ width: "auto", flex: 1, marginRight: 6 }}
              onPress={() => {
                setOverlay({
                  caption: editableCaptions[selectedCaption].caption,
                  open: true,
                });
              }}
            />
            <BlueButtonPrimary
              addStyles={{ width: "auto", flex: 1, marginLeft: 6 }}
              copy={t("photo/captions/save-caption")}
              onPress={navigateToPrompt}
            />
          </View>
        ) : null}
        {!!overlay.open && (
          <Overlay
            onRequestClose={() =>
              setOverlay((prevState) => ({ ...prevState, open: false }))
            }
          >
            <Text style={styles.overlayTitle(theme)}>
              + {t("photo/captions/add-caption")}
            </Text>
            <TextInput
              style={[
                styles.textInput(theme),
                {
                  minHeight: 240,
                },
              ]}
              value={overlay.caption}
              multiline={true}
              placeholder={t("photo/captions/custom-placeholder")}
              placeholderTextColor={theme.colors.G5}
              onChangeText={(text) => {
                setOverlay((prevState) => ({ ...prevState, caption: text }));
              }}
            />
            <BlueButtonPrimary
              onPress={() => {
                const newCaptions = [...editableCaptions];
                if (selectedCaption === null) {
                  newCaptions.push({ caption: overlay.caption });
                  setSelectedCaption(newCaptions.length - 1);
                } else {
                  newCaptions[selectedCaption].caption = overlay.caption;
                }
                setEditableCaptions([...newCaptions]);
                setOverlay({ open: false, caption: "" });
              }}
              copy={t("photo/captions/save-caption")}
            />
          </Overlay>
        )}
      </View>
    </AppBackground>
  );
}

//rnss
const styles = StyleSheet.create({
  buttonCont: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  captionCont: (theme) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  }),
  caption: (theme) => ({
    flex: 1,
    color: theme.colors.G9,
    paddingRight: 4,
    fontSize: 16,
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
  overlayTitle: () => ({
    color: theme.colors.G7,
    marginBottom: 12,
    fontWeight: "600",
  }),
  textInput: (theme) => ({
    width: "100%",
    padding: 12,
    backgroundColor: theme.colors.PureWhite,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.G3,
    color: theme.colors.G9,
    textAlignVertical: "top",
    marginBottom: 24,
    height: "auto",
  }),
});

export default withTheme(CaptionsScreen);
