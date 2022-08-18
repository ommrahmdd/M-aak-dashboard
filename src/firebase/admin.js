import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./config";

let adminRef = collection(db, "admins");
// HANDLE: Signup
export let signup = async (data) => {
  try {
    let userAuth = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    let user = await addDoc(adminRef, {
      ...data,
      adminAuth: userAuth.user.uid,
    });
  } catch (err) {
    return err.code;
  }
};
// HANDLE: login
export let login = async (email, password) => {
  try {
    let userAuth = await signInWithEmailAndPassword(auth, email, password);
    userAuth &&
      localStorage.setItem("M3akAdminToken", userAuth.user.accessToken);
    let q = query(adminRef, where("adminAuth", "==", userAuth.user.uid));
    let docsRef = await getDocs(q);
    console.log(docsRef.docs[0].data());
    return {
      ...docsRef.docs[0].data(),
      adminId: docsRef.docs[0].id,
    };
  } catch (err) {
    return err.code;
  }
};

// HANDLE: logout
export let logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("M3akAdminToken");
    return true;
  } catch (err) {
    return err.code;
  }
};
