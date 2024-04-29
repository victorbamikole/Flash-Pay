import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { CountryPicker } from "react-native-country-codes-picker";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { Formik } from "formik";
import { resetPasswordValidate } from "../helper/validate";

const Page = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const router = useRouter();

  async function onSignup() {
    if (!isLoaded) {
      return;
    }
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    console.log("fullPhoneNumber", fullPhoneNumber);
    try {
      const response = await signUp.create({
        emailAddress: "victorbamikole92@gmail.com",
        password: "Vickybavs4192$$",
      });

      // console.log("RESPONSE", response);

      // send the email.
      const response2 = await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      console.log("RESPONSE2", response2);

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.log("ERROR", err.errors[0]);
      Alert.alert(err.errors[0].message);
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    // setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Formik
        initialValues={{ password: "", confirm_pwd: "" }}
        validate={resetPasswordValidate}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Reset Now</Text>
            <Text style={defaultStyles.descriptionText}>
              Enter your new password
            </Text>
            <View style={styles.inputContainer}></View>

            <TextInput
              autoCapitalize="none"
              placeholder="New Password"
              value={values.password}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              style={[styles.input]}
              secureTextEntry={true}
            />
            <View style={{ paddingVertical: 20 }}>
              <TextInput
                placeholder="Confirm New Password"
                value={values.confirm_pwd}
                onBlur={handleBlur("confirm_pwd")}
                onChangeText={handleChange("confirm_pwd")}
                secureTextEntry={true}
                style={[styles.input]}
              />
            </View>

            <Link href={"/verify/[phone]"} replace asChild>
              <TouchableOpacity>
                <Text style={defaultStyles.textLink}>Confirm Password</Text>
              </TouchableOpacity>
            </Link>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                phoneNumber !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={defaultStyles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
    flexDirection: "row",
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
