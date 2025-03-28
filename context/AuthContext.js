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
            totalPoints: 0,
            totalHealth: 0,
            currency: 0,
            globalStart: 0,
            globalEnd: 0,
            roomDetails: [
              {
                roomNo: "G206",
                roomName: "Japan",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                roomStarted: false,
                startTime: 0,
                endTime: 0,

                games: [
                  {
                    name: "Kitsune no Yaiba",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Bomb Run",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Konpira",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Gacha",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Beach Episode",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "The Return of Fukushima",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G207",
                roomName: "Germany",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,
                endTime: 0,
                games: [
                  {
                    name: "The Dictator's Map",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Führer 101",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Blind brews",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Crash to win",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Eva's Temptation",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G104",
                roomName: "France",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Wheel of fortune",
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
                    name: "Blackjack",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Darts",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Lucky number",
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
                roomNo: "G106",
                roomName: "India",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Math Trivia",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Space Explorer",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Sing it",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Rhymes of the Past",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Speedster",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Checkmate",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Guess the price",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Gambler",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "F207",
                roomName: "Spain",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,
                endTime: 0,
                games: [
                  {
                    name: "Bone up",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Snort the lines (LOC)",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Beer pong",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Flip trip",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Pin Hit",
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
                roomNo: "G208",
                roomName: "Korea",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Dakji",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Balloon Stack Race",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "The Final Identity",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Cup or Die",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Marble Run: Death Route",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Beast Blitz",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "K-Scene Showdown",
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
