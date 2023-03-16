import { AppRegistry, Platform } from "react-native";
import { useEffect } from "react";
import Main from "./app/Main";
import useTranslation from "./app/hooks/translations";
AppRegistry.registerComponent(Main, () => App);

const App = () => {
  const { initializeTranslation } = useTranslation();
  useEffect(initializeTranslation, []);

  return <Main />;
};

export default App;
