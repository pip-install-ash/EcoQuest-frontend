import { getApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/const";

try {
  initializeApp(firebaseConfig);
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error("Firebase initialization error", error.stack);
  }
}
export default getApp();
