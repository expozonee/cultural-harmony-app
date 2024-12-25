import { db } from '../src/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function eventsLoader() {
  try {
    const queryEventsDB = await getDocs(collection(db, 'events'));
    const eventsData = queryEventsDB.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return eventsData;
  } catch (error) {
    console.error('Error fetching data from Firestore: ', error);
  }
}
