import { StyleSheet, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { withTheme } from "react-native-elements";
import { launchImageLibrary } from "react-native-image-picker";
import moment from "moment";
import GradientButton from "./styleComponents/GradientButton";
import BeigeButton from "./styleComponents/BeigeButton";
import useTranslation from "../hooks/translations";
import useUser from "../hooks/user";

function PhotoUploadButton({
  theme,
  image,
  selectedPromptId,
  captions,
  navigation,
}) {
  const { t } = useTranslation();
  const { updateCompletedPrompts } = useUser();

  const pickImage = async () => {
    () => {
      (async () => {
        if (Platform.OS !== "web") {
          const { status } =
            await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== "granted") {
            alert(t("permissions/camera-roll"));
          }
        }
      })();
    };

    const result = await launchImageLibrary({
      mediaType: Platform.OS === "web" ? "photo" : "mixed",
      saveToPhotos: true,
      includeExtra: true,
      quality: 1,
    });

    const { didCancel, assets } = result;

    if (!didCancel) {
      updateCompletedPrompts(selectedPromptId, {
        ...assets[0],
        promptId: selectedPromptId,
        dateUploaded: moment().format("DD MMM YYYY"),
        caption: captions[0] || "",
      });
    }
  };

  return (
    <View style={styles.container(theme)}>
      {Object.keys(image)?.length === 0 || image === -1 ? (
        <GradientButton copy="Upload Photo" onPress={pickImage} />
      ) : (
        <BeigeButton copy="Upload more photos" onPress={pickImage} />
      )}
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: (theme) => ({
    position: "relative",
    width: "100%",
  }),
});

export default withTheme(PhotoUploadButton);
