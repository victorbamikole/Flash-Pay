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
      <ImageBackground
        source={{
          uri: "https://cdn.pixabay.com/photo/2020/03/18/20/01/frankfurt-4945405_1280.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay} />
        <View style={{ padding: 20, marginTop: 80 }}>
          <Text style={styles.header}>
            Ready to Change the way you send money?
          </Text>
        </View>
        <View style={styles.buttons}>
          <Link
            href={"/login"}
            asChild
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: Colors.dark },
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
              { flex: 1, backgroundColor: "white" },
            ]}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 22, fontWeight: "500" }}>signup</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ImageBackground>

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
    textTransform: "uppercase",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 10,
  },
  touchable: { color: "white", fontSize: 22, fontWeight: "500" },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
