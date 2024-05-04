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
import { verifyPassword } from "./helper/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [isFetching, setIsFetching] = useState(false);

  const { username } = useAuthStore((state) => state.auth);

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  console.log("apidata", apiData);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Formik
        initialValues={{ password: "" }}
        validate={passwordValidate}
        onSubmit={async (values) => {
          try {
            setIsFetching(true);
            const res = await verifyPassword(username, values.password);
            console.log("PASSWORDRESPONSE", res?.data.status);

            if (res?.data.status === "success") {
              const { token } = res.data;
              console.log("TOKEN", token);
              try {
                await AsyncStorage.setItem("token", token);
              } catch (e) {
                // saving error
              }
              setIsFetching(false);
              router.push("/(authenticated)/(tabs)/home");
            } else {
            }
            setIsFetching(false);
            //  router.push("/(authenticated)/(tabs)/home");
          } catch (error) {
            console.error("Error during login:", error);
            // Handle error, such as displaying an error toast
          }
        }}
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
              href={"/verify/[phone]" as any} 
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

            <View style={{ paddingVertical: 20 }}>
              <CustomButton
                isLoading={isFetching}
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
