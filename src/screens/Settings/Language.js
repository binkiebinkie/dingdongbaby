import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import useTranslation from "../../hooks/translations";
import SettingsContext from "../../state/SettingsContext";

function Language({ route, theme }) {
  const { allSettings } = useContext(SettingsContext);
  const { t } = useTranslation();
  return <Text>Hello Language</Text>;
}

//rnss
const styles = StyleSheet.create({});

export default withTheme(Language);
