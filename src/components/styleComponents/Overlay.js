import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { withTheme } from "react-native-elements";

const Overlay = ({ visible, onRequestClose, children, theme }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View style={styles.overlay(theme)} />
    </TouchableWithoutFeedback>
    <View style={styles.modalContainer}>{children}</View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.G10,
    opacity: 0.2,
    zIndex: 80,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  }),
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    zIndex: 100,
    left: 8,
    right: 8,
    bottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
});

export default withTheme(Overlay);
