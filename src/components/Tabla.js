import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function Tabla({ data, headers }) {
  const renderHeader = () => (
    <View style={styles.row}>
      {headers.map((header, index) => (
        <Text key={index} style={[styles.cell, styles.header]}>
          {header}
        </Text>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {headers.map((key, index) => (
        <Text key={index} style={styles.cell}>
          {item[key]}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
});
