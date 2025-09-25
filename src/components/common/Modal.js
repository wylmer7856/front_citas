// src/components/common/Modal.js
import React from "react";
import { Modal as RNModal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import spacing from "../../styles/spacing";

export default function Modal({ visible, title, children, onClose }) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {title && <Text style={styles.title}>{title}</Text>}
          <View style={styles.content}>{children}</View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    elevation: 5,
  },
  title: {
    fontSize: fonts.sizes.large,
    fontWeight: "bold",
    marginBottom: spacing.md,
    color: colors.text,
  },
  content: {
    marginBottom: spacing.md,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  closeText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
