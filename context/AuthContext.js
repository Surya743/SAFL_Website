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
            globalStart: 0,
            globalEnd: 0,
            roomDetails: [
              {
                roomNo: "F208",
                roomName: "japan",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                roomStarted: false,
                startTime: 0,
                endTime: 0,

                games: [
                  {
                    name: "The Way of the Sword 1",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Way of the Sword 2",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Way of the Mirror",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Way of the Lord",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Tea Ceremony",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Priest's Enlightenment",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "???",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G205",
                roomName: "germany",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,
                endTime: 0,
                games: [
                  {
                    name: "Whose Line is it Anyway? Hitler/Kanye?",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Art of Balance",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Test of Fire",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Zero-Knowledge Proof",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "To be or not to be",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G208",
                roomName: "france",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Speed Uno",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Split and Steal",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "7 Up 7 Down",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Eiffel Tower",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Blackjack",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Bluff",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "F205",
                roomName: "india",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Riddle Me Not",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Momos",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Yoga",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Crack The Code",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Back Stabbing",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Herb Hunt",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Charades",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G207",
                roomName: "spain",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,
                endTime: 0,
                games: [
                  {
                    name: "Nerf Wars",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Castle Crumble",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Tower of Hanoi",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Foosball",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "HeadsUp",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Senorita",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G206",
                roomName: "korea",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Guess The Drink",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Whisper Challenge",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Dancing in Heels",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Flirting with Jailers",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Ottokae Song",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Paper Folding",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Musical Chairs",
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
