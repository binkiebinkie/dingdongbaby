import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import useTranslation from "../../hooks/translations";

import SettingsContext from "../../state/SettingsContext";
import SettingContainer from "./SettingContainer";

function Sharing({ route, theme }) {
  const { allSettings } = useContext(SettingsContext);
  const { t } = useTranslation();
  return <Text>Hello Sharing</Text>;
}

//rnss
const styles = StyleSheet.create({});

export default withTheme(Sharing);
