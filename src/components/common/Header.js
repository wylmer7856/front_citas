// src/components/common/Header.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import spacing from "../../styles/spacing";

export default function Header({ title, leftAction, rightAction }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftAction} style={styles.side}>
        {leftAction && <Text style={styles.actionText}>←</Text>}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={rightAction} style={styles.side}>
        {rightAction && <Text style={styles.actionText}>⋮</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
  },
  title: {
    color: colors.white,
    fontSize: fonts.sizes.large,
    fontWeight: "bold",
  },
  side: {
    width: 40,
    alignItems: "center",
  },
  actionText: {
    color: colors.white,
    fontSize: fonts.sizes.large,
  },
});
