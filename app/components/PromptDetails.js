import React, { Fragment } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import Star from "../assets/svgs/Star";
import Spacer from "./styleComponents/Spacer";
import { helpers } from "../helpers/helpers";
import { withTheme } from "react-native-elements";
import useUser from "../hooks/user";

const PromptDetails = ({
  theme,
  isHomePrompt,
  prompt: { name, id, difficulty, emoji, photo },
}) => {
  const diff = Number(difficulty);

  const { getSelectedAssetByPromptId, togglePrioritizedPrompt, userState } =
    useUser();
  const { prioritizedPrompts } = userState;
  const selectedAsset = getSelectedAssetByPromptId(id);
  const promptPrioritizedIndex = prioritizedPrompts?.findIndex(
    (pid) => Number(pid) === Number(id)
  );

  return (
    <Fragment key={`${name}${id}`}>
      <View style={styles.containerLeft(theme)}>
        <Text style={styles.name(theme)}>{name}</Text>
        <View style={styles.containerLeftDetails(theme)}>
          <View style={styles.favContainer(theme)}>
            <Text style={styles.idText(theme)}>
              {helpers.numberToThreeDigits(id)}
            </Text>
            <Pressable
              style={styles.fav(theme)}
              onPress={() => togglePrioritizedPrompt(id)}
            >
              <Star
                color={
                  promptPrioritizedIndex > -1
                    ? theme.colors.G6
                    : theme.colors.G2
                }
              />
            </Pressable>
          </View>
          <View
            style={[
              styles.difficultyContainer(theme),
              diff === 1
                ? styles.difficulty1(theme)
                : diff === 2
                ? styles.difficulty2(theme)
                : styles.difficulty3(theme),
            ]}
          >
            {[...Array.from(Array(Number(diff)))].map((e, i) => (
              <Fragment key={`${i}${i}${e}`}>
                <View
                  key={i}
                  style={[
                    styles.difficultyCircle(theme),
                    diff === 1
                      ? styles.difficultyCircle1(theme)
                      : diff === 2
                      ? styles.difficultyCircle2(theme)
                      : styles.difficultyCircle3(theme),
                  ]}
                />
                {i === diff - 1 ? null : (
                  <Spacer key={`spacer${i}`} width={4} height={"100%"} />
                )}
              </Fragment>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.containerRight(theme)}>
        {isHomePrompt && !!selectedAsset?.uri ? (
          <Image
            resizeMode="cover"
            source={{ uri: selectedAsset.uri }}
            style={styles.photo}
          />
        ) : (
          <Text style={styles.emoji}>{emoji}</Text>
        )}
      </View>
    </Fragment>
  );
};

//rnss
const styles = StyleSheet.create({
  container: (theme) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 12,
    background: "#FFFFFF",
    padding: 12,
  }),
  containerLeft: (theme) => ({
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  }),
  containerLeftDetails: (theme) => ({
    justifyContent: "space-between",
    flexDirection: "row",
  }),
  containerRight: (theme) => ({
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.G1,
    borderRadius: 8,
    minHeight: 75,
    marginLeft: 8,
    maxHeight: 75,
  }),
  favContainer: (theme) => ({
    justifyContent: "flex-start",
    flexDirection: "row",
  }),
  fav: (theme) => ({}),
  name: (theme) => ({
    fontSize: 20,
    color: theme.colors.G9,
    textTransform: "lowercase",
  }),
  idText: (theme) => ({
    backgroundColor: theme.colors.G2,
    color: theme.colors.G6,
    textAlignVertical: "center",
    fontSize: 12,
    marginRight: 4,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 4,
    paddingLeft: 4,
    borderRadius: 50,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 14,
  }),
  photo: {
    width: "100%",
    maxHeight: "100%",
    height: "100%",
    borderRadius: 8,
  },
  difficultyContainer: (theme) => ({
    padding: 4,
    borderRadius: 50,
    flexDirection: "row",
  }),
  difficultyCircle: (theme) => ({
    width: 10,
    height: 10,
    borderRadius: 6,
  }),
  difficultyCircle1: (theme) => ({ backgroundColor: theme.colors.Blue2 }),
  difficultyCircle2: (theme) => ({
    backgroundColor: theme.colors.Yellow2,
  }),
  difficultyCircle3: (theme) => ({
    backgroundColor: theme.colors.Red2,
  }),
  difficulty1: (theme) => ({ backgroundColor: theme.colors.Blue1 }),
  difficulty2: (theme) => ({
    backgroundColor: theme.colors.Yellow1,
  }),
  difficulty3: (theme) => ({ backgroundColor: theme.colors.Red1 }),
  emoji: { fontSize: 32 },
  top: (theme) => ({}),
});

export default withTheme(PromptDetails);
