import { createContext } from "react";
import { allSettings } from "../helpers/appData";

const SettingContext = createContext({
  selectedSetting: "",
  setSelectedSetting: () => {},
  allSettings
});
export default SettingContext;
