import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { withTheme } from "react-native-elements";
import moment from "moment";
import UserContext from "../state/UserContext";
import GradientButton from "./styleComponents/GradientButton";
import BeigeButton from "./styleComponents/BeigeButton";

function PhotoUploadButton({
  theme,
  image,
  selectedPrompt,
  captions,
  navigation
}) {
  const { user } = useContext(UserContext);

  const pickImage = async () => {
    () => {
      (async () => {
        if (Platform.OS !== "web") {
          const {
            status
          } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
    };
    console.log("hereeeee");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    console.log("result", result);

    if (!result.cancelled) {
      // don't mutate user PLS LOL
      const newUser = JSON.parse(JSON.stringify(user));
      console.log("HEREE", newUser);

      const thisImageIndex = newUser.completedPrompts.indexOf(
        prompt => prompt.promptId === selectedPrompt
      );
      // let newData = {};
      if (thisImageIndex >= 0) {
        newUser.completedPrompts[thisImageIndex].path = result.uri;
        newUser.completedPrompts[
          thisImageIndex
        ].dateUploaded = moment().format();
        newUser.completedPrompts[thisImageIndex].width = result.width;
        newUser.completedPrompts[thisImageIndex].height = result.height;
        // newData = newUser.completedPrompts[thisImageIndex];
      } else {
        newUser.completedPrompts.push({
          id: newUser.completedPrompts.length,
          promptId: selectedPrompt,
          path: result.uri,
          dateUploaded: moment().format("MMM DD YYYY"),
          height: result.height,
          width: result.width,
          caption: captions[0]
        });
        // newData =
        //   newUser.completedPrompts[newUser.completedPrompts.length - 1];
        navigation.navigate("Captions");
      }

      // TODO: Edit user on server
      // await storageHelpers
      //   .postAddCompletedPrompt(newData)
      //   .then(resp => {
      //     console.log("postAddCompletedPrompt ", resp);
      //     return setUser(newUser);
      //   })
      //   .catch(err => console.log("err postAddCompletedPrompt ", err));
    }
  };

  return (
    <View style={styles.container(theme)}>
      {!image || image === -1 ? (
        <GradientButton copy="Upload Photo" onPress={pickImage} />
      ) : (
        <BeigeButton copy="Change Photo" onPress={pickImage} />
      )}
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: theme => ({
    position: "relative",
    width: "100%"
  })
});

export default withTheme(PhotoUploadButton);
