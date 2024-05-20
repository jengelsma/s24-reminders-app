import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, push } from 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initRemindersDB() {
  initializeApp(firebaseConfig);
}

export function storeReminderItem(item) {
  const db = getDatabase();
  const reference = ref(db, 'reminderData/');
  push(reference, item);
}

export function setupReminderListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, 'reminderData/');
  onValue(reference, (snapshot) => {
    console.log('setupReminderListener fires up with: ', snapshot);
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        console.log(key, '||', index, '||', fbObject[key]);
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}
