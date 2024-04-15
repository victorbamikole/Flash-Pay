import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
  };
  return (
    <View style={defaultStyles.container}>
      <Text>login</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
