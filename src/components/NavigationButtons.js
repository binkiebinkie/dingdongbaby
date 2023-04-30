import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { withTheme } from "react-native-elements";
import Spacer from "./styleComponents/Spacer";
import Album from "../assets/svgs/Album";
import AlbumFilled from "../assets/svgs/AlbumFilled";
import Camera from "../assets/svgs/Camera";
import CameraFilled from "../assets/svgs/CameraFilled";
import AppContext from "../state/AppContext";
import useTranslation from "../hooks/translations";

function NavigationButtons({ theme }) {
  const { setSelectedHomeScreen, selectedHomeScreen } = useContext(AppContext);
  const { t } = useTranslation();
  return (
    <View style={styles.cont(theme)}>
      <TouchableOpacity
        style={styles.button(theme)}
        onPress={() => setSelectedHomeScreen("prompts")}
      >
        <View
          style={[
            styles.iconContainer(theme, selectedHomeScreen === "prompts"),
          ]}
        >
          {selectedHomeScreen === "prompts" ? (
            <CameraFilled stroke={theme.colors.G2} fill={theme.colors.G2} />
          ) : (
            <Camera />
          )}
        </View>

        <Text
          style={[styles.promptsFont(theme, selectedHomeScreen === "prompts")]}
        >
          {t("prompts")}
        </Text>
      </TouchableOpacity>
      <Spacer width={4} height={1} />
      <TouchableOpacity
        style={[styles.button(theme), { justifyContent: "flex-end" }]}
        onPress={() => setSelectedHomeScreen("album")}
      >
        <Text
          style={[styles.promptsFont(theme, selectedHomeScreen === "album")]}
        >
          {t("album")}
        </Text>
        <View
          style={[
            styles.iconContainer(theme, selectedHomeScreen === "album"),
            { marginLeft: 8, marginRight: 0 },
          ]}
        >
          {selectedHomeScreen === "album" ? (
            <AlbumFilled stroke={theme.colors.G2} fill={theme.colors.G2} />
          ) : (
            <Album />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  promptsFont: (theme, selected) => ({
    fontSize: 16,
    fontFamily: "SFCompactRoundedBold",
    textTransform: "lowercase",
    color: selected ? theme.colors.G9 : theme.colors.G5,
  }),
  cont: (theme) => ({
    backgroundColor: theme.colors.G3,
    position: "absolute",
    width: "100%",
    height: "auto",
    flexDirection: "row",
    padding: 4,
    paddingBottom: 24,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  }),
  button: (theme) => ({
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.G1,
  }),
  iconContainer: (theme, selected) => ({
    padding: 8,
    borderRadius: 8,
    backgroundColor: selected ? theme.colors.G9 : theme.colors.G2,
    marginRight: 8,
  }),
});

export default withTheme(NavigationButtons);
