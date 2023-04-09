import React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme } from "react-native-elements";

import PhotoCard from "./PhotoCard";
import moment from "moment";
import useUser from "../hooks/user";
import usePrompts from "../hooks/prompts";

function AlbumContainer({ theme }) {
  const { unlockedPrompts } = usePrompts();
  console.log(unlockedPrompts);
  return (
    <View style={styles.container(theme)}>
      <View style={styles.promptsScroll(theme)}>
        {unlockedPrompts.map(({ uri, id, dateUploaded, caption }) => (
          <PhotoCard
            key={id}
            image={uri}
            date={moment().format(dateUploaded, "MMM DD YYYY")}
            copy={caption}
          />
        ))}
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
