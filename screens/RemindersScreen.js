import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

const RemindersScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddReminder');
          }}
        >
          <Feather style={{ marginRight: 10 }} name='edit' size={24} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <Text> Reminders Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RemindersScreen;
