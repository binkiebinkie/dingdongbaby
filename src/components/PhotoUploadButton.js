import { StyleSheet, View, Platform } from "react-native";
import { withTheme } from "react-native-elements";
import { launchImageLibrary } from "react-native-image-picker";
import moment from "moment";
import BeigeButton from "./styleComponents/BeigeButton";
import useUser from "../hooks/user";
import BlueButtonPrimary from "./styleComponents/BlueButtonPrimary";

function PhotoUploadButton({
  theme,
  image,
  setImage,
  selectedPrompt,
  captions,
}) {
  const { updateCompletedPromptsAsset, getSelectedAssetByPromptId } = useUser();

  const pickImage = async () => {
    try {
      await launchImageLibrary(
        {
          mediaType: Platform.OS === "web" ? "photo" : "mixed",
          includeExtra: true,
          quality: 0.5,
        },
        async (response) => {
          console.log("response, ", response);

          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else {
            try {
              await updateCompletedPromptsAsset(selectedPrompt.id, {
                ...response.assets[0],
                promptId: selectedPrompt.id,
                dateUploaded: moment().format("DD MMM YYYY"),
                caption: captions[0] || "",
              });
              setImage(getSelectedAssetByPromptId(selectedPrompt?.id));
            } catch (err) {
              console.error(err);
            }
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container(theme)}>
      {Object.keys(image)?.length === 0 || image === -1 ? (
        <BlueButtonPrimary onPress={pickImage} copy={"Upload Photo"} />
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
