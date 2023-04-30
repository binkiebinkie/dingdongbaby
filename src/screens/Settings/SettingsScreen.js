import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import useTranslation from "../../hooks/translations";
import AppBackground from "../../components/AppBackground";
import SettingsContext from "../../state/SettingsContext";
import UpsellContainer from "../../components/UpsellContainer";
import GradientButton from "../../components/styleComponents/GradientButton";
import HeaderCloseBar from "../../components/HeaderCloseBar";
import SettingContainer from "./SettingContainer";

function SettingsScreen({ theme }) {
  const { allSettings } = useContext(SettingsContext);
  const { t } = useTranslation();

  return (
    <AppBackground>
      <View style={styles.headerContainer}>
        <HeaderCloseBar copy={t("settings/title")} navigateTo="Home" />
        <UpsellContainer />
      </View>
      <View style={styles.settingsContainer}>
        {allSettings.map((setting) => (
          <SettingContainer key={setting?.title} setting={setting} />
        ))}
      </View>
      <View style={styles.gradientButtonContainer}>
        <GradientButton copy="upload a prompt idea" />
      </View>
      <View style={styles.ethGradCont}>
        <Text style={styles.ethGrad(theme)}>by ethics gradient</Text>
        <Text style={styles.version(theme)}>
          {t("settings/version", { version: 1.0 })}
        </Text>
      </View>
    </AppBackground>
  );
}

//rnss
const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    paddingTop: 0,
  },
  gradientButtonContainer: {
    width: "100%",
    padding: 32,
  },
  ethGradCont: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 36,
    paddingTop: 180,
  },
  ethGrad: (theme) => ({
    color: theme.colors.G6,
    fontSize: 16,
    fontWeight: "bold",
  }),
  version: (theme) => ({
    color: theme.colors.G4,
    fontSize: 12,
    fontWeight: "300",
  }),
});

export default withTheme(SettingsScreen);
