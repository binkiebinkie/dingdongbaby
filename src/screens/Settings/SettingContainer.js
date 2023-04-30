import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { withTheme } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import useTranslation from "../../hooks/translations";
import GreyFont from "../../components/styleComponents/GreyFont";
import ChevronLeft from "../../assets/svgs/ChevronLeft";

const SettingContainer = ({ theme, setting }) => {
  const { title, settings } = setting;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const navigateToSetting = (setting) => {
    navigation.navigate(setting);
  };
  return (
    <View style={styles.cont}>
      <GreyFont>{t(title)}</GreyFont>
      {settings.map((s) => (
        <Pressable
          onPress={() => navigateToSetting(s?.to ? s.to : s?.title)}
          key={s?.title}
          style={styles.setting(theme)}
        >
          <Text style={styles.settingTitle(theme)}>{t(s.title)}</Text>
          <ChevronLeft style={styles.settingChevron(theme)} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    width: "100%",
    marginBottom: 32,
  },
  greyFont: (theme) => ({
    fontFamily: "SFCompactRoundedBold",
    color: theme.colors.G6,
    fontSize: 16,
    fontWeight: "600",
    width: "100%",
    paddingLeft: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.G2,
  }),
  scroll: { flexDirection: "column", flex: 1 },
  setting: (theme) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.PureWhite,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.G2,
  }),
  settingTitle: (theme) => ({
    color: theme.colors.G9,
    fontSize: 16,
    letterSpacing: 0.36,
    flex: 1,
  }),
  settingChevron: (theme) => ({
    color: theme.colors.G9,
    transform: [{ rotate: "180deg" }],
  }),
});

export default withTheme(SettingContainer);
