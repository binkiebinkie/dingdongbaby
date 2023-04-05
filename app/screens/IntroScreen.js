import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView, Text, Button } from "react-native";
import { withTheme } from "react-native-elements";
import moment from "moment";

import PhotoCard from "../components/PhotoCard";
import AppBackground from "../components/AppBackground";
import GradientButton from "../components/styleComponents/GradientButton";
import TextPureBlack24 from "../components/styleComponents/TextPureBlack24";
import Spacer from "../components/styleComponents/Spacer";
import monk1 from "../assets/placeholders/monk1.png";
import monk2 from "../assets/placeholders/monk2.png";
import monk3 from "../assets/placeholders/monk3.png";
import monk4 from "../assets/placeholders/monk4.png";

import useTranslation from "../hooks/translations";
import useUser from "../hooks/user";
import usePrompts from "../hooks/prompts";
//rsf
function IntroScreen({ navigation, route, theme }) {
  const { t } = useTranslation();
  const { changeUserOnboarding, userState } = useUser();
  const { addRandomPromptToUser } = usePrompts();
  const navigateHome = async () => {
    console.log("pressed");

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

      // return navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    }
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
        <PhotoCard
          image={monk1}
          copy={
            "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north."
          }
          date={moment().format("MMM DD YYYY")}
        />
        <Spacer width="100%" height={12} />
        <TextPureBlack24
          addStyles={{ textAlign: "center" }}
          copy={t("intro/title--2")}
        />
        <Spacer width="100%" height={12} />
        <PhotoCard
          image={monk2}
          copy={
            "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north."
          }
          date={moment().format("MMM DD YYYY")}
        />
        <Spacer width="100%" height={12} />
        <TextPureBlack24
          addStyles={{ textAlign: "center" }}
          copy={t("intro/title--3")}
        />
        <Spacer width="100%" height={12} />
        <PhotoCard
          image={monk3}
          copy={
            "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north."
          }
          date={moment().format("MMM DD YYYY")}
        />
        <Spacer width="100%" height={12} />

        <TextPureBlack24
          addStyles={{ textAlign: "center" }}
          copy={t("intro/title--4")}
        />
        <Spacer width="100%" height={12} />
        <PhotoCard
          image={monk4}
          copy={
            "After gold was found in 1848 stories of easy riches compelled thousands of young men to pack up their belongings and head north."
          }
          date={moment().format("MMM DD YYYY")}
        />
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
