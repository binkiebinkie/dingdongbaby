import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { withTheme } from "react-native-elements";
import AppBackground from "../../components/AppBackground";
import UnlockedPromptsContainer from "./UnlockedPromptsContainer";
import LockedPromptsContainer from "./LockedPromptsContainer";
import HomeHeader from "./HomeHeader";
import HomeSettingsContainer from "./HomeSettingsContainer";
import Spacer from "../../components/styleComponents/Spacer";
import AlbumContainer from "../../components/AlbumContainer";
import AppContext from "../../state/AppContext";
import usePrompts from "../../hooks/prompts";

// rsf
const HomeScreen = ({ navigation, theme }) => {
  const { selectedHomeScreen } = useContext(AppContext);
  const { allPromptsCount, unlockedPrompts } = usePrompts();

  return (
    <AppBackground hasNavigationButtons={true}>
      <View>
        <HomeSettingsContainer navigation={navigation} />
        <HomeHeader
          copy={selectedHomeScreen}
          allPromptsCount={allPromptsCount}
          unlockedCount={unlockedPrompts.count}
        />
        <Spacer width="100%" height={24} />
        {selectedHomeScreen === "prompts" ? (
          <View style={styles.darkContainer(theme)}>
            <UnlockedPromptsContainer />
            <LockedPromptsContainer />
          </View>
        ) : (
          <AlbumContainer />
        )}
      </View>
    </AppBackground>
  );
};

//rnss
const styles = StyleSheet.create({
  cont: (theme) => ({
    position: "relative",
    paddingTop: 32,
    minHeight: "100%",
  }),
  darkContainer: (theme) => ({
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    padding: 16,
    backgroundColor: theme.colors.Beige2,
  }),
});

export default withTheme(HomeScreen);
