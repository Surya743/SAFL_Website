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
                roomNo: "F208",
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
                    bossGame: true,
                    name: "bossGame",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "F208",
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
                    name: "Roulette",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "F208",
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
                roomNo: "F208",
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
                roomNo: "F208",
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
