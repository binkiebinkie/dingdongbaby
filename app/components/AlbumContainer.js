import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import UserContext from "../state/UserContext";
import AppContext from "../state/AppContext";
import PhotoCard from "./PhotoCard";
import moment from "moment";

function AlbumContainer({ theme }) {
  const { user } = useContext(UserContext);
  const { app } = useContext(AppContext);
  const { completedPrompts } = user;
  const { prompts } = app;
  console.log(
    "completedPromptscompletedPromptscompletedPrompts",
    completedPrompts
  );

  return (
    <View style={styles.container(theme)}>
      <View style={styles.promptsScroll(theme)}>
        {completedPrompts.map(chal => (
          <PhotoCard
            key={chal.id}
            image={chal.path}
            date={moment().format(chal.dateUploaded, "MMM DD YYYY")}
            copy={chal.caption}
          />
        ))}
      </View>
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: "relative",
    flex: 1
  }),
  promptsScroll: theme => ({
    width: "100%",
    flex: 1,
    flexDirection: "column"
  })
});

export default withTheme(AlbumContainer);
