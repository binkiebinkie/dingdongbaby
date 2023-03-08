import { createContext } from "react";
import moment from "moment";

const AppContext = createContext({
  lastUpdated: moment(),
  selectedPrompt: null,
  setSelectedPrompt: () => {},
  prompts: [],
  lockedPrompts: []
});

export default AppContext;
