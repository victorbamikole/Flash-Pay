import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Page = () => {
  const balance = 1420;
  return (
    <ScrollView style={{backgroundColor: Colors.background}}>
      <View style={styles.account}>
        <View style={styles.row}>

        </View>

      </View>

    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
});
