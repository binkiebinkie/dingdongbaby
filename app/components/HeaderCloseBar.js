import { StyleSheet, View, Text, Pressable } from "react-native";
import { withTheme } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import XClose from "../assets/svgs/XClose";

const HeaderCloseBar = ({ theme, navigateTo, copy }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.closeContainer}>
      <Text style={styles.greyFont(theme)}>{copy}</Text>
      <Pressable
        style={styles.XCloseCont}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <XClose />
      </Pressable>
    </View>
  );
};

//rnss
const styles = StyleSheet.create({
  closeContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  greyFont: theme => ({
    fontFamily: "SFCompactRoundedBold",
    color: theme.colors.G6,
    fontSize: 16,
    fontWeight: "600"
  }),
  XCloseCont: {
    padding: 8,
    position: "absolute",
    right: -8,
    top: "50%",
    transform: [{ translateY: -14 }]
  }
});

export default withTheme(HeaderCloseBar);
