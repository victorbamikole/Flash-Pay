import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "@/constants/Styles";
import RoundBtn from "@/app/components/RoundBtn";
import DropDown from "@/app/components/Dropdown";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Stack, router, useRouter, useSegments } from "expo-router";

const Page = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const balance = 1420;
  const headerHeight = useHeaderHeight();
  const { signOut } = useAuth();
    const router = useRouter();

  const onSignOut = () => {
    if (!isLoaded) {
      return null;
    }
    const out = signOut();
    console.log("OUT", out);
  };

  const logOut = async () => {
    try {
      await AsyncStorage.setItem("token", "");
       router.replace("/");
    } catch (e) {
      // saving error
    }
  };

  const onAddMoney = () => {
    // runTransaction({
    //   id: Math.random().toString(),
    //   amount:
    //     Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
    //   date: new Date(),
    //   title: "Added money",
    // });
  };
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon={"add"} text={"Add money"} onPress={logOut} />
        <RoundBtn icon={"refresh"} text={"Exchange"} onPress={undefined} />
        <RoundBtn icon={"list"} text={"Details"} />
        <DropDown />
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
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
