import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";
let casesRef = collection(db, "cases");
// HANDLE: add new Case
export let addNewCase = async (data) => {
  try {
    let docRef = await addDoc(casesRef, data);
    return docRef.id;
  } catch (err) {
    return err.code;
  }
};
