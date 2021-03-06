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
  selectedChallenge,
  captions,
  navigation
}) {
  const { user, setPhotoForHomeChallenge } = useContext(UserContext);

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

      const thisImageIndex = newUser.completedChallenges.indexOf(
        challenge => challenge.challengeId === selectedChallenge
      );
      // let newData = {};
      if (thisImageIndex >= 0) {
        newUser.completedChallenges[thisImageIndex].path = result.uri;
        newUser.completedChallenges[
          thisImageIndex
        ].dateUploaded = moment().format();
        newUser.completedChallenges[thisImageIndex].width = result.width;
        newUser.completedChallenges[thisImageIndex].height = result.height;
        setPhotoForHomeChallenge(newUser);
        // newData = newUser.completedChallenges[thisImageIndex];
      } else {
        newUser.completedChallenges.push({
          id: newUser.completedChallenges.length,
          challengeId: selectedChallenge,
          path: result.uri,
          dateUploaded: moment().format("MMM DD YYYY"),
          height: result.height,
          width: result.width,
          caption: captions[0]
        });
        // newData =
        //   newUser.completedChallenges[newUser.completedChallenges.length - 1];
        setPhotoForHomeChallenge(newUser);
        navigation.navigate("Captions");
      }

      // TODO: Edit user on server
      // await storageHelpers
      //   .postAddCompletedChallenge(newData)
      //   .then(resp => {
      //     console.log("postAddCompletedChallenge ", resp);
      //     return setUser(newUser);
      //   })
      //   .catch(err => console.log("err postAddCompletedChallenge ", err));
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
