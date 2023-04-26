import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { withTheme } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { updateUserCredentials } from "../../api/users";
import ErrorFont from "../../components/styleComponents/ErrorFont";
import GradientButton from "../../components/styleComponents/GradientButton";
import GreyFont from "../../components/styleComponents/GreyFont";
import useTranslation from "../../hooks/translations";
import useUser from "../../hooks/user";
import UserContext from "../../state/UserContext";
import SettingScreen from "./SettingScreen";

function Login({ theme }) {
  const { t } = useTranslation();
  const { updateCredentials } = useUser();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { userState } = useContext(UserContext);
  console.log(userState);

  useEffect(() => {
    const { email } = userState;
    if (email) {
      setCredentials((prevState) => ({
        ...prevState,
        email,
      }));
    }
  }, [userState?.email]);

  const handleSubmit = async () => {
    try {
      await updateUserCredentials(credentials);
    } catch (err) {
      console.error(err);
      console.log(err?.response);
      console.log(err?.response?.data);
      if (err.response) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <SettingScreen>
      <>
        <GreyFont>{t("email")}</GreyFont>
        <TextInput
          style={[styles.textInput(theme), { marginBottom: 8 }]}
          key="email"
          name="email"
          onChange={(e) => {
            setErrors((prevState) => ({ ...prevState, email: "" }));
            setCredentials((prevState) => ({
              ...prevState,
              email: e.nativeEvent.text,
            }));
          }}
          value={credentials?.email}
          keyboardType="email-address"
        />
        {!!errors?.email && <ErrorFont>{t(errors.email)}</ErrorFont>}
        <GreyFont>{t("password")}</GreyFont>
        <TextInput
          //   secureTextEntry={true}
          style={[styles.textInput(theme), { marginBottom: 16 }]}
          key="password"
          name="password"
          onChange={(e) => {
            setErrors((prevState) => ({ ...prevState, password: "" }));
            console.log("e", e);
            setCredentials((prevState) => ({
              ...prevState,
              password: e.nativeEvent.text,
            }));
          }}
          value={credentials?.password}
        />
        {!!errors?.password && <ErrorFont>{t(errors.password)}</ErrorFont>}
        <GradientButton
          copy={t("settings/login/save-credentials")}
          onPress={async () => {
            handleSubmit();
          }}
        ></GradientButton>
      </>
    </SettingScreen>
  );
}

//rnss
const styles = StyleSheet.create({
  textInput: (theme) => ({
    width: "100%",
    backgroundColor: theme.colors.PureWhite,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.colors.G2,
  }),
  greyFont: (theme) => ({
    fontFamily: "SFCompactRoundedBold",
    color: theme.colors.G6,
    fontSize: 16,
    fontWeight: "600",
    width: "100%",
    paddingLeft: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.G2,
  }),
});

export default withTheme(Login);
