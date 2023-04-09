import { createContext } from "react";
import moment from "moment";

const AppContext = createContext({
  lastUpdated: moment(),
  selectedPromptId: null,
  setSelectedPromptId: () => {},
  prompts: [],
  lockedPrompts: [],
});

export default AppContext;
