import Lightbulb from "../../assets/svgs/Lightbulb";
import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";

const Tip = ({ theme, tip }) => {
  return (
    <View style={[styles.tipContainer(theme), styles.alertContainer(theme)]}>
      <View style={styles.svgContainer(theme)}>
        <Lightbulb />
      </View>
      <Text style={[styles.tipText(theme), styles.alertText(theme)]}>
        {tip}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: theme => ({
    borderRadius: 8,
    marginTop: 4,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  }),
  alertText: theme => ({
    fontSize: 12,
    flex: 1
  }),
  svgContainer: theme => ({
    width: 46,
    height: 46,
    backgroundColor: theme.colors.PureWhite,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4
  }),
  tipContainer: theme => ({ backgroundColor: theme.colors.Blue1 }),
  tipText: theme => ({
    color: theme.colors.Blue3
  })
});

export default withTheme(Tip);
