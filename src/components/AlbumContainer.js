import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";

import PhotoCard from "./PhotoCard";
import useTranslation from "../hooks/translations";
import UserContext from "../state/UserContext";
import TextG6Bold14 from "./styleComponents/TextG6Bold14";

function AlbumContainer({ theme }) {
  const { t } = useTranslation();
  const { userState } = useContext(UserContext);
  console.log("userStateuserStateuserState", userState);
  return (
    <View style={styles.container(theme)}>
      <View style={styles.promptsScroll(theme)}>
        {userState?.completedPrompts?.length === 0 ? (
          <TextG6Bold14
            addStyles={{ marginLeft: 16 }}
            copy={t("album/no-photos")}
          />
        ) : (
          userState?.completedPrompts?.map((completedPrompt) => (
            <PhotoCard
              key={completedPrompt?._id}
              image={completedPrompt?.assets[0]}
              completedPrompt={completedPrompt}
              containerStyles={{ marginBottom: 16 }}
            />
          ))
        )}
      </View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: (theme) => ({
    position: "relative",
    flex: 1,
  }),
  promptsScroll: (theme) => ({
    width: "100%",
    flex: 1,
    flexDirection: "column",
  }),
});

export default withTheme(AlbumContainer);
