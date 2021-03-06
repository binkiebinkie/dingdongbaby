import React, { useContext } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import AppBackground from "../components/AppBackground";
import { withTheme } from "react-native-elements";
import SettingsContext from "../state/SettingsContext";
import UserContext from "../state/UserContext";
import HeaderCloseBar from "../components/HeaderCloseBar";

//rsf
const SettingScreen = ({ route, theme, navigation }) => {
  const { selectedSetting } = useContext(SettingsContext);
  const { user, updateUser } = useContext(UserContext);
  const { inputs } = selectedSetting;
  const renderInput = input => {
    const { type, name } = input;
    if (type === "text") {
      let keyboardType = "default";
      if (name === "email") keyboardType = "email-address";
      return (
        <TextInput
          style={styles.textInput(theme)}
          key={name}
          name={name}
          onChange={e => updateUser(e.nativeEvent.text, name)}
          value={user[name]}
          keyboardType={keyboardType}
        />
      );
    }
  };
  return (
    <AppBackground>
      <View style={styles.headerCont}>
        <HeaderCloseBar copy={selectedSetting.title} navigateTo="Settings" />
      </View>
      {inputs.map(input => renderInput(input))}
    </AppBackground>
  );
};

//rnss
const styles = StyleSheet.create({
  headerCont: {
    padding: 16
  },
  textInput: theme => ({
    width: "100%",
    backgroundColor: theme.colors.PureWhite,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.colors.G2
  })
});

export default withTheme(SettingScreen);
