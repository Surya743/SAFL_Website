import React,{useContext,useState,useEffect,useRef} from "react";

import {auth,db} from '../firebase'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,onAuthStateChanged } from "firebase/auth";
import {doc,getDoc,setDoc} from 'firebase/firestore'


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const userInfo = useRef();

    async function signup(email,password,teamName,teamLeaderName,mobileNumber){
        return createUserWithEmailAndPassword(auth,email,password).then(async cred => {
            try{
                await setDoc(doc(db, "users", cred.user.uid), {
                    email : email,
                    teamName : teamName,
                    teamLeaderName : teamLeaderName,
                    mobileNumber : mobileNumber,
                    roomDetails : {
                        japan : {
                                roomCompletedStatus : false,
                                roomHealth : 0,
                                roomPoints : 0,
                                startTime : 0,
                                endTime : 0,
                                game1 : {
                                    health : 10,
                                    points : 10
                                },
                                game2 : {
                                    health : 10,
                                    points : 10
                                },
                                game3 : {
                                    health : 10,
                                    points : 10
                                },
                                game4 : {
                                    health : 10,
                                    points : 10
                                },
                                game5 : {
                                    health : 10,
                                    points : 10
                                },
                                
                                bossGame : {
                                    health : 100,
                                    points : 100
                                }

                            
                        },
                        germany : {
                            roomCompletedStatus : false,
                            roomHealth : 0,
                            roomPoints : 0,
                            startTime : 0,
                            endTime : 0,
                            game1 : {
                                health : 10,
                                points : 10
                            },
                            game2 : {
                                health : 10,
                                points : 10
                            },
                            game3 : {
                                health : 10,
                                points : 10
                            },
                            game4 : {
                                health : 10,
                                points : 10
                            },
                            game5 : {
                                health : 10,
                                points : 10
                            },
                            
                            bossGame : {
                                health : 100,
                                points : 100
                            }

                        
                    },
                    spain : {
                        roomCompletedStatus : false,
                        roomHealth : 0,
                        roomPoints : 0,
                        startTime : 0,
                        endTime : 0,
                        game1 : {
                            health : 10,
                            points : 10
                        },
                        game2 : {
                            health : 10,
                            points : 10
                        },
                        game3 : {
                            health : 10,
                            points : 10
                        },
                        game4 : {
                            health : 10,
                            points : 10
                        },
                        game5 : {
                            health : 10,
                            points : 10
                        },
                        
                        bossGame : {
                            health : 100,
                            points : 100
                        }

                    
                },
                france : {
                    roomCompletedStatus : false,
                    roomHealth : 0,
                    roomPoints : 0,
                    startTime : 0,
                    endTime : 0,
                    game1 : {
                        health : 10,
                        points : 10
                    },
                    game2 : {
                        health : 10,
                        points : 10
                    },
                    game3 : {
                        health : 10,
                        points : 10
                    },
                    game4 : {
                        health : 10,
                        points : 10
                    },
                    game5 : {
                        health : 10,
                        points : 10
                    },
                    
                    bossGame : {
                        health : 100,
                        points : 100
                    }

                
            },
            india : {
                roomCompletedStatus : false,
                roomHealth : 0,
                roomPoints : 0,
                startTime : 0,
                endTime : 0,
                game1 : {
                    health : 10,
                    points : 10
                },
                game2 : {
                    health : 10,
                    points : 10
                },
                game3 : {
                    health : 10,
                    points : 10
                },
                game4 : {
                    health : 10,
                    points : 10
                },
                game5 : {
                    health : 10,
                    points : 10
                },
                
                bossGame : {
                    health : 100,
                    points : 100
                }

            
        },
        korea : {
            roomCompletedStatus : false,
            roomHealth : 0,
            roomPoints : 0,
            startTime : 0,
            endTime : 0,
            game1 : {
                health : 10,
                points : 10
            },
            game2 : {
                health : 10,
                points : 10
            },
            game3 : {
                health : 10,
                points : 10
            },
            game4 : {
                health : 10,
                points : 10
            },
            game5 : {
                health : 10,
                points : 10
            },
            
            bossGame : {
                health : 100,
                points : 100
            }

        
    }

                        
                       
                    }
                  });
            }
            catch(error){
                console.log(error)
            }

            return cred
        });
        
    }

    async function login(email,password){
        
          return signInWithEmailAndPassword(auth,email,password).then(async cred => {
           
            return cred
            
          }
           
          )
    }

    function logout(){

        return signOut(auth)
    }

    useEffect(()=> {
const unsubscribe = onAuthStateChanged(auth,async user => {
    setCurrentUser(user);
    setLoading(false);
})
return unsubscribe;

    },[])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        userInfo
    }


    return(
       <AuthContext.Provider value={value}>
        {!loading && children}
       </AuthContext.Provider>
    )
}

