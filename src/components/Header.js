import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ title, showBack = false, onBackPress, rightComponent }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      {showBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightComponent && (
        <View style={styles.rightComponent}>
          {rightComponent}
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backIcon: {
    fontSize: 20,
    color: '#3498db',
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  rightComponent: {
    marginLeft: 15,
  },
});

export default Header;
