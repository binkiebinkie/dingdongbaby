import { api } from ".";
import {
  getManufacturer,
  getModel,
  getSystemName,
  getUniqueId,
} from "react-native-device-info";
import { storeToken } from "../storage";
import { helpers } from "../helpers/helpers";

export const auth = (data) => api.post(`auth`, data);

export const authenticateDevice = async () => {
  try {
    const deviceId = await getUniqueId();
    const manufacturer = await getManufacturer();
    const model = await getModel();
    const systemName = await getSystemName();

    // TODO const uid = `${deviceId}-${manufacturer}-${model}-${systemName}`;
    // const uid = helpers.guidGenerator();
    const uid = "ed2ecb52-e519-ba00-227a-8db256edb105";
    console.log("frontend uid,", uid);
    const response = await auth({
      uid,
    });

    if (response?.data) {
      const { token, user } = response.data;

      await storeToken(token);
      return user;
    }
    return undefined;
  } catch (error) {
    console.error("Error during device authentication:", error);
  }
};
