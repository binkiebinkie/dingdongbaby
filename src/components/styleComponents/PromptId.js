import { StyleSheet, View, Text } from "react-native";
import { withTheme } from "react-native-elements";
import { helpers } from "../../helpers/helpers";
import CheckmarkCircle from "../../assets/svgs/CheckmarkCircle";

const PromptId = ({ complete, id, theme }) => {
  return (
    <View style={[styles.idTextContainer(theme, complete)]}>
      {complete && (
        <CheckmarkCircle
          stroke={theme.colors.Green1}
          fill={theme.colors.Green3}
          style={{ marginRight: 4 }}
        />
      )}
      <Text style={styles.idText(theme, complete)}>
        {helpers.numberToThreeDigits(id)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  idText: (theme, complete) => ({
    color: complete ? theme.colors.Green4 : theme.colors.G6,
    textAlignVertical: "center",
    fontSize: 12,
    borderRadius: 12,
    lineHeight: 14,
    fontWeight: "bold",
  }),
  idTextContainer: (theme, complete) => ({
    backgroundColor: complete ? theme.colors.Green1 : theme.colors.G2,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 4,
    paddingLeft: 4,
    borderRadius: 50,
    marginRight: 8,
    height: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }),
});

export default withTheme(PromptId);
