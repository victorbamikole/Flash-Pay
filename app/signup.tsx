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
        password: 'Vickybavs4192$$',
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
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
            <Text
              style={{
                color: Colors.gray,
                fontSize: 20,
              }}
            >
              {countryCode}
            </Text>
            <Text
              style={{
                color: Colors.gray,
                fontSize: 20,
              }}
            >
              {countryFlag}
            </Text>
          </TouchableOpacity>
          <CountryPicker
            show={show}
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setCountryFlag(item.flag);
              setShow(false);
            }}
            lang={""}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {!pendingVerification && (
          <>
            <TextInput
              autoCapitalize="none"
              placeholder="simon@galaxies.dev"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={[styles.input]}
            />
            <View style={{ paddingVertical: 20 }}>
              <TextInput
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[styles.input]}
              />
            </View>
          </>
        )}

        {pendingVerification && (
          <>
            <View>
              <TextInput
                value={code}
                placeholder="Code..."
                style={styles.input}
                onChangeText={setCode}
              />
            </View>
            <Button
              onPress={onPressVerify}
              title="Verify Email"
              color={"#6c47ff"}
            ></Button>
          </>
        )}

        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
