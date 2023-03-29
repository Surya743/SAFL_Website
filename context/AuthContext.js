import React, { useContext, useState, useEffect, useRef } from "react";

import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  async function signup(
    email,
    password,
    teamName,
    teamLeaderName,
    mobileNumber
  ) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        try {
          await setDoc(doc(db, "users", cred.user.uid), {
            email: email,
            uid: cred.user.uid,
            teamName: teamName,
            teamLeaderName: teamLeaderName,
            mobileNumber: mobileNumber,
            totalPoints: 1000,
            totalHealth: 1000,
            currency: 1500,
            roomDetails: [
              {
                roomName: "japan",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                roomStarted: false,
                startTime: 0,
                endTime: 0,

                games: [
                  {
                    name: "game1",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game2",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game3",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game4",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game5",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "bossGame",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomName: "germany",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,
                endTime: 0,
                games: [
                  {
                    name: "game1",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game2",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game3",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game4",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game5",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "bossGame",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomName: "france",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "game1",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game2",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game3",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game4",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game5",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "bossGame",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomName: "india",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "game1",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game2",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game3",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game4",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game5",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "bossGame",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomName: "spain",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,
                endTime: 0,
                games: [
                  {
                    name: "game1",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game2",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game3",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game4",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game5",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "bossGame",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomName: "korea",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "game1",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game2",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game3",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game4",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "game5",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "bossGame",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }

        return cred;
      }
    );
  }

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        return cred;
      }
    );
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
