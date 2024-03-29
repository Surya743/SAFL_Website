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
                roomNo: "F208",
                roomName: "Japan",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                roomStarted: false,
                startTime: 0,
                endTime: 0,

                games: [
                  {
                    name: "Incluesion",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Crumbling",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Bar",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Make her spin",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Let it grip",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Is it wrong to enter a dungeon?",
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
                    name: "Time Bound Traveler",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Laser-eyed Navigator",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Let’s get wasted",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Football Mania",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Serious Seduction",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G208",
                roomName: "France",
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
                    name: "Stack the Cups",
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
                    bossGame: true,
                    name: "Roulette",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "G206",
                roomName: "India",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Thala for a Reason",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Financial Affairs",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Baburao ka style",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Rocket (Wo)man",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Indian Da Vinci",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Shankarabharanam",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "The Real Thala",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Shivaji Worship",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                ],
              },
              {
                roomNo: "F205",
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
                    name: "House of Cards",
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
                roomNo: "F207",
                roomName: "Korea",
                roomCompletedStatus: false,
                roomHealth: 0,
                roomPoints: 0,
                startTime: 0,
                roomStarted: false,

                endTime: 0,

                games: [
                  {
                    name: "Elephant Spin",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Relay game",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Stone game",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    name: "Ddakji",
                    health: 0,
                    points: 0,
                    completed: false,
                  },
                  {
                    bossGame: true,
                    name: "Gesture Game",
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
