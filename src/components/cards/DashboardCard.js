// src/components/cards/DashboardCard.js
import React from "react";
import { Text, View } from "react-native";
import Card from "../common/Card";

export default function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>{icon || "📊"}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
        <Text style={{ fontSize: 24 }}>{value}</Text>
      </View>
    </Card>
  );
}
