import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import DashboardRoomQuestCard from "@/components/DashboardComponents/DashboardRoomQuestCard";
import DashboardRoomBossCard from "@/components/DashboardComponents/DashboardRoomBossCard";
import RoomStatusCard from "@/components/DashboardComponents/RoomStatusCard";
import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import RoomParagraph from "@/components/DashboardComponents/RoomParagraph";
import Loading from "@/components/Errors/Loading";

export default function DashboardRoom() {
  const { currentUser } = useAuth();
  const [started, setStarted] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState({});
  const [roomNameParam, setRoomNameParams] = useState("");
  const [roomGamesCount, setRoomGamesCount] = useState(0);
  const [completedGamesCount, setCompletedGamesCount] = useState(0);

  async function startRoom() {
    try {
      let temp = userData.roomDetails.map((room) => {
        if (room.roomName == roomNameParam) {
          room.roomStarted = true;
          room.startTime = Date.now();

        }
        return room;
      });

      const docRef = doc(db, "users", currentUser.uid);

      await updateDoc(docRef, {
        roomDetails: temp,
        globalStart : Date.now()
      }).then((event) => {
        setStarted(true);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchData() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const roomName = urlSearchParams.get("name");
      setRoomNameParams(roomName);
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setTeamName(data.teamName);
          setRoomData(data.roomDetails);
          data.roomDetails.map((room) => {
            if (room.roomName == roomName) {
              setStarted(room.roomStarted);
              room.games.map((game) => {
                setRoomGamesCount((count) => count + 1);
                if (game.completed == true) {
                  setCompletedGamesCount((count) => count + 1);
                }
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (currentUser) {
    const router = useRouter();
    const { name } = router.query;

    return (
      teamName && (
        <>
          <div className="min-h-screen bg-violet-200 ">
          

            <DashboardNavbar />
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <p class="font-bold">Alert</p>
  <p>Updated Rooms</p>
  <p>Japan F208</p>
  <p>India F205</p>
  <p>Spain G206</p>
  <p>France G208</p>

  <p>Korea F207</p>
  <p>Germany G205</p>

</div>
            <div className="flex mx-8 my-8 lg:mt-20 lg:mx-20 justify-center">
              <div>
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                  Welcome {teamName} to
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
                    {" "}
                    {name.charAt(0).toUpperCase() + name.slice(1)}!
                  </span>
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl">
                  Complete our tasks to win the grand prize{" "}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              {started ? (
                <>
                  <div className="flex justify-center items-center pt-8 mx-4">
                    {roomData.map((room) => {
                      if (room.roomName == name) {
                        return (
                          <RoomStatusCard
                            roomHealth={room.roomHealth}
                            roomPoints={room.roomPoints}
                            completedGames={completedGamesCount}
                            roomGamesCount={roomGamesCount}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex mx-8 my-12 lg:mt-12 lg:mx-20 justify-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
                      Main Boss
                    </h1>
                  </div>
                  <div className="flex justify-center items-center pt-0 mx-4">
                    {roomData.map((room) => {
                      if (room.roomName == name) {
                        return room.games.map((game) => {
                          // console.log(game);
                          if (game.bossGame == true)
                            return (
                              <DashboardRoomBossCard
                                details={game}
                                completed={game.completed}
                              />
                            );
                        });
                      }
                    })}
                  </div>

                  <div className="flex mx-8 my-12 lg:mt-12 lg:mx-20 justify-center">
                    <h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
                      Games
                    </h1>
                  </div>
                  <div className=" container px-4 md:mx-auto lg:mx-auto sm:mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                      {roomData.map((room) => {
                        if (room.roomName == name) {
                          return room.games.map((game) => {
                            if (game.bossGame != true)
                              return (
                                <DashboardRoomQuestCard
                                  details={game}
                                  completed={game.completed}
                                />
                              );
                          });
                        }
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center py-12">
                    <div>
                      <RoomParagraph roomName={name} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center pt-6">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => startRoom()}
                    >
                      Start Room
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="py-12"></div>
          </div>
        </>
      )
    );
  } else if (!currentUser) {
    return <NotLoggedIn />;
  } else {
    return <Loading />;
  }
}
