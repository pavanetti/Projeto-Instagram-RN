import * as firebase from "firebase";
import "firebase/firestore";

import { uuid } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCAIDG4f9xSMZDbaZZcxj2HPVtbPcKKCF0",
  authDomain: "instagram-demo-16206.firebaseapp.com",
  databaseURL: "https://instagram-demo-16206.firebaseio.com",
  projectId: "instagram-demo-16206",
  storageBucket: "instagram-demo-16206.appspot.com",
  messagingSenderId: "798502828023",
  appId: "1:798502828023:web:803fddca9e4231a0cd60f2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export async function fetchPostsFromFirebase(size = 5) {
  const collectionName = "snack-SJucFknGX";
  const collection = firebase.firestore().collection(collectionName);
  const query = collection.orderBy("timestamp", "desc").limit(size);
  const querySnapshot = await query.get();

  return querySnapshot.docs.map((doc) => {
    if (doc.exists) {
      const post = doc.data();
      const user = post.user;
      const name = user.deviceName;
      return {
        key: doc.id,
        name,
        ...post,
      };
    }
  });
}

export async function uploadToFirebase(image, description) {
  const collectionName = "snack-SJucFknGX";
  const collection = firebase.firestore().collection(collectionName);

  const uid = uuid();
  const remoteUri = await uploadImage(image, `${uid}`);

  collection.add({
    text: description,
    uid: uid,
    timestamp: Date.now(),
    image: remoteUri,
  });
}

function uploadImage(image, path) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(image);
    const blob = await response.blob();

    const ref = firebase.storage().ref(path);
    const unsubscribe = ref.put(blob).on(
      "state_changed",
      (state) => {},
      (err) => {
        unsubscribe();
        reject(err);
      },
      async () => {
        const url = await ref.getDownloadURL();
        resolve(url);
      }
    );
  });
}
