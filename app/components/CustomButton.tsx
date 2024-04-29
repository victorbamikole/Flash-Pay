import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  TextStyle,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

interface ReusableButtonProps extends TouchableOpacityProps {
  isLoading: boolean;
  title: string;
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const CustomButton: React.FC<ReusableButtonProps> = ({
  isLoading,
  title,
  buttonStyle,
  titleStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        defaultStyles.pillButton,
        isLoading ? styles.disabled : styles.enabled,
        { marginBottom: 20 },
      ]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[
            {
              color: "#fff",
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
