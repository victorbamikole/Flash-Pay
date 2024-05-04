import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={{
          uri: "https://cdn.pixabay.com/photo/2020/03/18/20/01/frankfurt-4945405_1280.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      >
       
      </ImageBackground> */}

      {/**Logo */}
      <View></View>

      {/**image */}
      <View></View>

      {/**Title */}
      <View>
        <Text style={styles.header}>Dream. Invest. Live</Text>
        <Text style={styles.subHeader}>
          Encapsulates the essence of a transformative journey towards financial
          freedom and personal fulfillment.
        </Text>
      </View>

      {/**buttons */}
      <View></View>

      <View style={styles.buttons}>
        <Link
          href={"/login"}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "white" },
          ]}
        >
          <TouchableOpacity>
            <Text style={styles.touchable}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "#70ffbe" },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>signup</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )} */}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a7f51",
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    color: "white",
    fontWeight: "900",
    textTransform: "capitalize",
    paddingHorizontal: 25,
  },
  subHeader: {
    fontSize: 14,
    color: "white",
    paddingHorizontal: 25,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 10,
  },
  touchable: { color: "black", fontSize: 22, fontWeight: "500" },

  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  // overlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  // },
});
