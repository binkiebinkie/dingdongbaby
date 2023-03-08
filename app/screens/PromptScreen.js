import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { withTheme } from "react-native-elements";

import AppContext from "../state/AppContext";
import UserContext from "../state/UserContext";
import AppBackground from "../components/AppBackground";
import Alert from "../assets/svgs/Alert";
import Tip from "../assets/svgs/Tip";
import ChevronLeft from "../assets/svgs/ChevronLeft";
import PromptDetails from "../components/PromptDetails";
import PhotoCard from "../components/PhotoCard";
import PhotoUploadButton from "../components/PhotoUploadButton";
import Spacer from "../components/styleComponents/Spacer";
import { LinearGradient } from "expo-linear-gradient";
import HeaderCloseBar from "../components/HeaderCloseBar";
import Camera from "../assets/svgs/Camera";
import { helpers } from "../helpers/helpers";
import usePrompts from "../hooks/prompts";

//rsf
function PromptScreen({ navigation, theme }) {
  const { user } = useContext(UserContext);
  const { selectedPrompt, setSelectedPrompt, app } = useContext(AppContext);
  const { unlockedPrompts } = usePrompts();

  const image = user.completedPrompts.find(
    obj => obj.promptId === selectedPrompt
  );
  const prompt = unlockedPrompts.find(p => p.id === selectedPrompt);
  const { desc, warning, tip, id, captions } = prompt;
  const promptIndex = unlockedPrompts.findIndex(p => p.id === selectedPrompt);

  const navigateToPrompt = indexChange => {
    const otherPrompt = unlockedPrompts[promptIndex + indexChange];
    if (otherPrompt) {
      setSelectedPrompt(otherPrompt.id);
    }
  };

  return (
    <AppBackground>
      <View style={styles.cont}>
        <HeaderCloseBar
          copy={helpers.numberToThreeDigits(id)}
          navigateTo="Home"
        />
        <View style={styles.contentContainer}>
          {image && image.path ? (
            <PhotoCard
              copy={image.caption}
              date={image.date ? image.date : image.dateUploaded}
              image={image.path}
            />
          ) : (
            <View style={styles.photoContainer(theme)}>
              <Camera color={theme.colors.G3} />
            </View>
          )}
          <Spacer height={12} width="100%" />
          <View style={styles.cardContainer(theme)}>
            <View style={styles.detailsContainer(theme)}>
              <PromptDetails prompt={prompt} />
            </View>
            <LinearGradient
              colors={theme.colors.Gradient}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.gradientLine(theme)}
            ></LinearGradient>
            <Text style={styles.desc(theme)}>{desc}</Text>
            <PhotoUploadButton
              image={image}
              captions={captions}
              selectedPrompt={selectedPrompt}
              navigation={navigation}
            />
          </View>
          {tip.length ? (
            <View
              style={[styles.tipContainer(theme), styles.alertContainer(theme)]}
            >
              <View style={styles.svgContainer(theme)}>
                <Tip />
              </View>
              <Text style={[styles.tipText(theme), styles.alertText(theme)]}>
                {tip}
              </Text>
            </View>
          ) : (
            []
          )}
          {warning.length ? (
            <View
              style={[
                styles.warningContainer(theme),
                styles.alertContainer(theme)
              ]}
            >
              <View style={styles.svgContainer(theme)}>
                <Alert />
              </View>
              <Text
                style={[styles.warningText(theme), styles.alertText(theme)]}
              >
                {warning}
              </Text>
            </View>
          ) : (
            []
          )}
        </View>
        <View style={styles.navigationButtons}>
          <Pressable
            style={styles.navigationButton(theme)}
            onPress={() => navigateToPrompt(-1)}
            disabled={promptIndex - 1 >= 0 ? false : true}
          >
            <ChevronLeft />
            <Text style={styles.navigationButtonText(theme)}>previous</Text>
          </Pressable>
          <Pressable
            style={[
              styles.navigationButton(theme),
              { justifyContent: "flex-end" }
            ]}
            onPress={() => navigateToPrompt(1)}
          >
            <Text
              style={[styles.navigationButtonText(theme), { marginRight: 8 }]}
            >
              next
            </Text>
            <ChevronLeft style={{ transform: [{ rotate: "180deg" }] }} />
          </Pressable>
        </View>
      </View>
    </AppBackground>
  );
}

//rnss
const styles = StyleSheet.create({
  cardContainer: theme => ({
    backgroundColor: "white",
    borderRadius: 12,
    width: "100%",
    padding: 12
  }),
  closeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 24
  },
  cont: { paddingLeft: 16, paddingRight: 16, height: "100%", flex: 1 },
  contentContainer: {
    minHeight: "100%",
    flex: 1,
    justifyContent: "flex-end"
  },
  desc: theme => ({ fontSize: 20, color: theme.colors.G10, paddingBottom: 20 }),
  detailsContainer: theme => ({
    flexDirection: "row",
    width: "100%"
  }),
  gradientLine: theme => ({
    height: 4,
    borderRadius: 8,
    width: "100%",
    marginTop: 12,
    marginBottom: 24
  }),
  imageStyles: theme => ({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    resizeMode: "contain"
  }),
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    paddingTop: 12
  },
  navigationButton: theme => ({
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: theme.colors.G1,
    width: "49%",
    borderRadius: 8
  }),
  navigationButtonText: theme => ({
    color: theme.colors.G6,
    fontSize: 16,
    marginLeft: 8
  }),
  safeArea: theme => ({
    backgroundColor: theme.colors.Black,
    flex: 1
  }),
  svgContainer: theme => ({
    width: 46,
    height: 46,
    backgroundColor: theme.colors.PureWhite,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4
  }),

  alertContainer: theme => ({
    borderRadius: 8,
    marginTop: 4,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  }),
  alertText: theme => ({
    fontSize: 12,
    flex: 1
  }),
  photoContainer: theme => ({
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.G3,
    borderStyle: "dashed",
    flex: 1,
    borderRadius: 12
  }),
  tip: theme => ({
    width: "100%",
    padding: 4,
    background: "lightblue"
  }),
  tipContainer: theme => ({ backgroundColor: theme.colors.Blue1 }),
  tipText: theme => ({
    color: theme.colors.Blue3
  }),
  warning: theme => ({
    width: "100%",
    padding: 4,
    background: "gold"
  }),
  warningContainer: theme => ({
    backgroundColor: theme.colors.Yellow1
  }),
  warningText: theme => ({
    color: theme.colors.Yellow3
  })
});

export default withTheme(PromptScreen);
