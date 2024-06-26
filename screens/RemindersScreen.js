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
import {
  initRemindersDB,
  storeReminderItem,
  setupReminderListener,
  updateReminder,
  deleteReminder,
} from '../helpers/fb-reminders';

const RemindersScreen = ({ route, navigation }) => {
  const comparator = (item1, item2) => {
    if (item1.text.toLowerCase() > item2.text.toLowerCase()) {
      return 1;
    } else if (item1.text.toLowerCase() < item2.text.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  };

  const [reminders, setReminders] = useState([]);
  const [display, setDisplay] = useState('All');

  useEffect(() => {
    try {
      initRemindersDB();
    } catch (err) {
      console.log(err);
    }
    setupReminderListener((items) => {
      console.log('setting state with: ', items);
      setReminders(items.sort(comparator));
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (display === 'All') {
              setDisplay('Not Done');
            } else if (display == 'Not Done') {
              setDisplay('Done');
            } else {
              setDisplay('All');
            }
          }}
        >
          <Text style={styles.textStyle}> {display} </Text>
        </TouchableOpacity>
      ),

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

  useEffect(() => {
    if (route.params?.text) {
      storeReminderItem(route.params);
    }
  }, [route.params?.text]);

  const displayFilter = (item) => {
    if (display === 'All') {
      return true;
    } else if (display === 'Done') {
      return item.done ? true : false;
    } else {
      return item.done ? false : true;
    }
  };

  const addRemindersNotDisplayed = (newArr) => {
    if (display === 'Not Done') {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return i.done;
        })
      );
    } else if (display === 'Done') {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return !i.done;
        })
      );
    }
    return newArr;
  };

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          updateReminder({ ...item, done: !item.done });
        }}
        onLongPress={() => {
          deleteReminder(item);
        }}
      />
    );
  };

  return (
    <FlatList
      data={reminders.filter(displayFilter)}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({});

export default RemindersScreen;
