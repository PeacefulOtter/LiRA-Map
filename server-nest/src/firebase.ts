﻿import * as firebase from "firebase/app";
import "firebase/firestore";

import { FIREBASE_CONFIG } from "./database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);

export const firestore = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);
