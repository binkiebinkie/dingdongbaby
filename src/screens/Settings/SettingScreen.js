import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import AppBackground from "../../components/AppBackground";
import { withTheme } from "react-native-elements";
import SettingsContext from "../../state/SettingsContext";
import HeaderCloseBar from "../../components/HeaderCloseBar";

const SettingScreen = ({ theme, children }) => {
  const { selectedSetting } = useContext(SettingsContext);

  return (
    <AppBackground>
      <View style={styles.headerCont}>
        <HeaderCloseBar copy={selectedSetting.title} navigateTo="Settings" />
      </View>
      {children}
    </AppBackground>
  );
};

//rnss
const styles = StyleSheet.create({
  headerCont: {
    padding: 16,
    paddingTop: 8,
  },
  textInput: (theme) => ({
    width: "100%",
    backgroundColor: theme.colors.PureWhite,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.colors.G2,
  }),
});

export default withTheme(SettingScreen);
