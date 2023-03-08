import axios from "axios";
import moment from "moment";
import { initialUser, initialApp } from "./appData";

export default {
  postIsCacheOrServerNewer: async cacheData =>
    await axios
      .post("/user/check-user", { cacheData })
      .then(resp => {
        const { data } = resp;
        console.log("data.lastUpdated)", data.lastUpdated);
        if (
          data &&
          data.lastUpdated &&
          moment(data.lastUpdated).isBefore(cacheData?.lastUpdated)
        ) {
          // server is newer, return this data
          return data;
        }
      })
      .catch(err => console.log("getUserFromServer err", err)),

  getUserFromServer: async () =>
    await axios
      .get("/user/get-user")
      .then(resp => resp.data)
      .catch(err => console.log("getUserFromServer err", err)),

  getIPFromAmazon: async () =>
    await fetch("https://checkip.amazonaws.com/")
      .then(res => res.text())
      .then(ip => ip),

  postAddCompletedPrompt: async prompt =>
    await axios
      .post("/user/add-completed-prompt", { prompt })
      .then(resp => resp.data)
      .catch(err => console.log("postAddCompletedPrompt err", err)),

  setInitialUser: initialUser,

  setInitialApp: initialApp
};
