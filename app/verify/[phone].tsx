import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/api";
import { useRouter } from "expo-router";

const CELL_COUNT = 6;

type VerifyOTPResponse = {
  status: any;
  // Other properties
};

const Page = () => {
  const router = useRouter();
  const { auth } = useAuthStore();
  const { username } = auth;
  console.log("USERNAME", username);
  const { email, signin } = useLocalSearchParams<{
    email: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");
  const [enableButton, setEnableButton] = useState(false);
  const { signIn } = useSignIn();
  const { isLoaded, signUp, setActive } = useSignUp();
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      verifyOtpCode();
      // if (signin === "true") {
      //   verifySignIn();
      // } else {
      //   onPressVerify();
      // }
    }
  }, [code]);

  useEffect(() => {
    generateOTP(username).then((otp) => {
      if (otp) {
        console.log("EMAILOTP", otp);
        Alert.alert("Success", "OTP has been sent to your email ");
      } else {
        Alert.alert("Error", "Error generarting OTP");
      }
    });
  }, [username]);

  const verifyOtpCode = async () => {
    const response = await verifyOTP(username, code);
    const { status } = response as { status: number };
    console.log("STATUS2", status);
    if (status === 201) {
      setEnableButton(true);
      Alert.alert("Success", "OTP successfully verified ");
    } else {
      return Alert.alert("Error", "Error verifying OTP");
    }
  };

  const resendOtp = async () => {
    try {
      const OTP = await generateOTP(username);
      console.log("OTP:", OTP);
      console.log("OTP has been sent to your email!");
      Alert.alert("OTP has been sent to your email!");
    } catch (error) {
      console.error("Could not send OTP:", error);
      Alert.alert("Error", "Could not send OTP:");
    }
  };

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const navigate = () => {
    router.push({ pathname: "reset/reset" } as any);
  };

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

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter the 6 digit Code sent to your email address
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <TouchableOpacity onPress={resendOtp}>
        <Text style={[defaultStyles.textLink]}>Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          enableButton ? styles.enabled : styles.disabled,
          { marginBottom: 20, marginTop: 20 },
        ]}
        onPress={navigate}
      >
        <Text style={defaultStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
