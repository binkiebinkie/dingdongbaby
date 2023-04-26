import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import AppBackground from "../../components/AppBackground";
import { withTheme } from "react-native-elements";
import SettingsContext from "../../state/SettingsContext";
import HeaderCloseBar from "../../components/HeaderCloseBar";
import useUser from "../../hooks/user";

const SettingScreen = ({ theme, children }) => {
  const { selectedSetting } = useContext(SettingsContext);
  const { user, updateUserKeyValue } = useUser();
  const { inputs } = selectedSetting;

  // const renderInput = (input) => {
  //   const { type, name, keyboard } = input;
  //   if (type === "text") {
  //     let keyboardType = "default";
  //     if (!!keyboard) keyboardType = keyboard;
  //     return (
  //       <TextInput
  //         style={styles.textInput(theme)}
  //         key={name}
  //         name={name}
  //         onChange={(e) => updateUserSetting(name, e.nativeEvent.text)}
  //         value={user[name]}
  //         keyboardType={keyboardType}
  //       />
  //     );
  //   }
  // };
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
