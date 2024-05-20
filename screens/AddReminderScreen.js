import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

const AddReminderScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Reminders');
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Reminders');
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <Text> Add Reminder Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddReminderScreen;