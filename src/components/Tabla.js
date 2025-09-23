// src/components/Tabla.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tabla({ headers, data }) {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        {headers.map((header, index) => (
          <Text key={index} style={[styles.cell, styles.header]}>
            {header}
          </Text>
        ))}
      </View>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <Text key={cellIndex} style={styles.cell}>
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    padding: 8,
    fontSize: 14,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
});
