import Main from "./app/Main";
import { useEffect } from "react";
import useTranslation from "./app/hooks/translations";
const App = () => {
  const { initializeTranslation } = useTranslation();
  useEffect(() => initializeTranslation, []);
  return <Main />;
};
export default App;
