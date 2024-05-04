import {
  Alert,
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
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Formik } from "formik";
import { userNameValidate } from "./helper/validate";
import { useAuthStore } from "./store/store";
import CustomButton from "./components/CustomButton";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();
  const setUserName = useAuthStore((state) => state.setUsername);
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={userNameValidate}
        onSubmit={async (values) => {
          values = await Object.assign(values);
          setUserName(values.username);
          router.push({ pathname: "/password" });
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Welcome Back</Text>
            <Text style={defaultStyles.descriptionText}>
              Enter your user name associated with your account
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Username"
                placeholderTextColor={Colors.gray}
                value={values.username}
                onBlur={handleBlur("username")}
                onChangeText={handleChange("username")}
              />
            </View>

            <Link
              href={"/signup"}
              replace
              asChild
              style={{ paddingBottom: 30 }}
            >
              <TouchableOpacity>
                <Text style={defaultStyles.textLink}>
                  Don't have an account? Sign Up!
                </Text>
              </TouchableOpacity>
            </Link>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <View
                style={{
                  flex: 1,
                  height: StyleSheet.hairlineWidth,
                  backgroundColor: Colors.gray,
                }}
              />
              <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
              <View
                style={{
                  flex: 1,
                  height: StyleSheet.hairlineWidth,
                  backgroundColor: Colors.gray,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => onSignIn(SignInType.Email)}
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: "row",
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: "#fff",
                },
              ]}
            >
              <Ionicons name="mail" size={24} color={"#000"} />
              <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
                Continue with email{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onSignIn(SignInType.Google)}
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: "row",
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: "#fff",
                },
              ]}
            >
              <Ionicons name="logo-google" size={24} color={"#000"} />
              <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
                Continue with email{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onSignIn(SignInType.Apple)}
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: "row",
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: "#fff",
                },
              ]}
            >
              <Ionicons name="logo-apple" size={24} color={"#000"} />
              <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
                Continue with email{" "}
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                values.userName !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20, marginTop: 20 },
              ]}
            >
              <Text style={defaultStyles.buttonText}>Continue</Text>
            </TouchableOpacity> */}

            <View style={{ paddingVertical: 20 }}>
              <CustomButton
                isLoading={isLoading}
                title={"Log in"}
                onPress={() => handleSubmit()}
                emailField={values.username}
              />
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
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
});
