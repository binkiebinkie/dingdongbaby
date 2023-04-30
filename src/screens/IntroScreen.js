import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";

import PhotoCard from "../components/PhotoCard";
import AppBackground from "../components/AppBackground";
import GradientButton from "../components/styleComponents/GradientButton";
import TextPureBlack24 from "../components/styleComponents/TextPureBlack24";
import Spacer from "../components/styleComponents/Spacer";

import useTranslation from "../hooks/translations";
import useUser from "../hooks/user";
import usePrompts from "../hooks/prompts";
import UserContext from "../state/UserContext";
//rsf
function IntroScreen({ navigation }) {
  const { t } = useTranslation();
  const { changeUserOnboarding } = useUser();
  const { userState } = useContext(UserContext);
  const { addRandomPromptToUser } = usePrompts();

  const navigateHome = async () => {
    try {
      await changeUserOnboarding({ viewedIntro: true });
      if (userState?.unlockedPromptIds?.length === 0) {
        await addRandomPromptToUser(1);
        await addRandomPromptToUser(1);
        await addRandomPromptToUser(1);
        await addRandomPromptToUser(2);
        await addRandomPromptToUser(2);
        await addRandomPromptToUser(2);
        await addRandomPromptToUser(3);
        await addRandomPromptToUser(3);
        await addRandomPromptToUser(3);
      }

      return navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    }
  };
  const image1 = {
    uri: 1,
    caption:
      "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north.",
  };
  const image2 = {
    uri: 2,
    caption:
      "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north.",
  };
  const image3 = {
    uri: 3,
    caption:
      "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north.",
  };
  const image4 = {
    uri: 4,
    caption:
      "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north.",
  };

  return (
    <AppBackground>
      <View style={styles.background}>
        <Text>{t("dingdong baby")}</Text>
        <Spacer width="100%" height={24} />
        <TextPureBlack24
          addStyles={{ textAlign: "center" }}
          copy={t("intro/title--1")}
        />
        <Spacer width="100%" height={12} />
        <PhotoCard image={image1} />
        <Spacer width="100%" height={12} />
        <TextPureBlack24
          addStyles={{ textAlign: "center" }}
          copy={t("intro/title--2")}
        />
        <Spacer width="100%" height={12} />
        <PhotoCard image={image2} />
        <Spacer width="100%" height={12} />
        <TextPureBlack24
          addStyles={{ textAlign: "center" }}
          copy={t("intro/title--3")}
        />
        <Spacer width="100%" height={12} />
        <PhotoCard image={image3} />
        <Spacer width="100%" height={12} />
        <TextPureBlack24
          addStyles={{ textAlign: "center" }}
          copy={t("intro/title--4")}
        />
        <Spacer width="100%" height={12} />
        <PhotoCard image={image4} />
        <Spacer width="100%" height={24} />
        <GradientButton copy={t("intro/cta-button")} onPress={navigateHome} />
      </View>
    </AppBackground>
  );
}

//rnss
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 16,
  },
});

export default withTheme(IntroScreen);
