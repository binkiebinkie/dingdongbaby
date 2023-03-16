import { useContext } from "react";
import { StyleSheet, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { withTheme } from "react-native-elements";
import { launchImageLibrary } from "react-native-image-picker";
import moment from "moment";
import UserContext from "../state/UserContext";
import GradientButton from "./styleComponents/GradientButton";
import BeigeButton from "./styleComponents/BeigeButton";
import { uniqueId } from "lodash";
import useTranslation from "../hooks/translations";

function PhotoUploadButton({
  theme,
  image,
  selectedPrompt,
  captions,
  navigation
}) {
  const { t } = useTranslation();
  const { updateCompletedPrompts } = useContext(UserContext);

  const pickImage = async () => {
    () => {
      (async () => {
        if (Platform.OS !== "web") {
          const {
            status
          } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== "granted") {
            alert(t("permissions/camera-roll"));
          }
        }
      })();
    };
    console.log("hereeeee", Platform);
    const result = await launchImageLibrary({
      mediaType: Platform.OS === "web" ? "photo" : "mixed",
      saveToPhotos: true,
      includeExtra: true,
      quality: 1
    });

    console.log("result", result);
    const { didCancel, assets } = result;

    if (!didCancel) {
      const { uri, width, height, assetId } = assets[0];
      updateCompletedPrompts(selectedPrompt, {
        assetId,
        id: uniqueId("asset-"),
        promptId: selectedPrompt,
        path: uri,
        dateUploaded: moment().format("DD MMM YYYY"),
        height,
        width,
        caption: captions[0] || ""
      });
    }
  };

  // const pickImage = async () => {
  //   () => {
  //     (async () => {
  //       if (Platform.OS !== "web") {
  //         const {
  //           status
  //         } = await ImagePicker.requestCameraRollPermissionsAsync();
  //         if (status !== "granted") {
  //           alert(t("permissions/camera-roll"));
  //         }
  //       }
  //     })();
  //   };
  //   console.log("hereeeee");
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1
  //   });

  //   console.log("result", result);

  //   if (!result.canceled) {
  //     const { uri, width, height, assetId } = result.assets[0];
  //     updateCompletedPrompts(selectedPrompt, {
  //       assetId,
  //       id: uniqueId("asset-"),
  //       promptId: selectedPrompt,
  //       path: uri,
  //       dateUploaded: moment().format("DD MMM YYYY"),
  //       height,
  //       width,
  //       caption: captions[0] || ""
  //     });
  //   }
  // };

  return (
    <View style={styles.container(theme)}>
      {!image || image === -1 ? (
        <GradientButton copy="Upload Photo" onPress={pickImage} />
      ) : (
        <BeigeButton copy="Upload more photos" onPress={pickImage} />
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
