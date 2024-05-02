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
import { passwordValidate, userNameValidate } from "./helper/validate";
import CustomButton from "./components/CustomButton";
import { useFetch } from "./hooks/fetch.hook";
import { useAuthStore } from "./store/store";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();

  const { username } = useAuthStore((state) => state.auth);

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  console.log("apidata", apiData);

  <Formik
    initialValues={{ password: "" }}
    validateOnChange={false}
    validateOnBlur={false}
    onSubmit={(values) => console.log(values)}
  ></Formik>;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Formik
        initialValues={{ password: "" }}
        validate={passwordValidate}
        onSubmit={(values) => console.log(values)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Welcome Back</Text>
            <Text style={defaultStyles.descriptionText}>
              Enter your password associated with your account{" "}
              {apiData?.username}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="password"
                placeholderTextColor={Colors.gray}
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                secureTextEntry={true}
              />
            </View>

            <Link
              href={"/reset/reset"}
              replace
              asChild
              style={{ paddingBottom: 30 }}
            >
              <TouchableOpacity>
                <Text style={defaultStyles.textLink}>
                  Forgort your password? Reset Now
                </Text>
              </TouchableOpacity>
            </Link>

            {/* <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                values.password !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20, marginTop: 20 },
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={defaultStyles.buttonText}>Continue</Text>
            </TouchableOpacity> */}

            <View style={{ paddingVertical: 20 }}>
              <CustomButton
                isLoading={isLoading}
                title={"Log in"}
                onPress={() => handleSubmit()}
                emailField={values.password}
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
