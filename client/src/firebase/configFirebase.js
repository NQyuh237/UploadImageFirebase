import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8R5ySoKsa-RxMpkSFVVU7vduJoFUdPEI",
  authDomain: "md2-ss14.firebaseapp.com",
  projectId: "md2-ss14",
  storageBucket: "md2-ss14.appspot.com",
  messagingSenderId: "184722561011",
  appId: "1:184722561011:web:f2498f0916bfa87dcce486",
};

// khoi tao firebase
const app = initializeApp(firebaseConfig);
// tao tham chieu den dich vu luu tru
// duoc su dung de them chieu trong toan bo ung dung
const storage = getStorage(app);

// export ra ngoai de su dung
export { storage };
