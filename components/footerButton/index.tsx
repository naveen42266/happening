import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
interface FooterButtonProps {
  name: string;
  value: any;
  onView: (value: boolean) => void;
  onSubmit: (value: boolean) => void;
}

const FooterButton: React.FC<FooterButtonProps> = ({ name, value, onView, onSubmit }) => {

  return (
    <View style={styles.footer}>
      {name === "Pay Now" && value.tickets >= 1 ?
        <TouchableOpacity onPress={() => { onView(true) }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 4 }}>
            <Text style={styles.totalPrice}>₹ {value.totalPrice} </Text>
            <Text style={{ color: "#757575" }}>{"for"} {value.tickets} {value.tickets === 1 ? "seat" : "seats"}</Text>
          </View>
          <Text style={{ color: "#757575" }}>{value.totalPrice > 0 && "+199 tax & fees"}</Text>
        </TouchableOpacity>
        : value.content ? <Text style={{ color: "#757575" }}>{value.content}</Text> : <Text></Text>}
      <TouchableOpacity onPress={() => { onSubmit(true) }}>
        <Button mode="contained" style={{
          backgroundColor: value.content ? "#7E2CCF4D" : "#6B46C1",
          borderRadius: 25,
        }}>
          {name}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -1 },
    elevation: 3,
  },
  proceedButton: {
    backgroundColor: "#6B46C1",
    borderRadius: 25,
  },
  totalPrice: { fontSize: 20, color: "#7E2CCF", fontWeight: "bold" },
});

export default FooterButton;