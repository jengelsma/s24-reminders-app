import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import Toast from 'react-native-root-toast';

const RemindersScreen = ({ route, navigation }) => {
  const items = [
    { text: 'get groceries', done: false },
    { text: 'feed dog', done: false },
    { text: 'take out trash', done: false },
  ];

  const [reminders, setReminders] = useState(items);

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

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          let newArr = [...reminders];
          newArr[index] = { ...item, done: !item.done };
          setReminders(newArr);
        }}
        onLongPress={() => {
          let newArr = reminders.filter((val, idx) => {
            return idx == index ? false : true;
          });
          setReminders(newArr);
          Toast.show(`Deleted ${item.text}!`, {
            duration: Toast.durations.SHORT,
            animation: true,
            hideOnPress: true,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.text}
      data={reminders}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({});

export default RemindersScreen;
