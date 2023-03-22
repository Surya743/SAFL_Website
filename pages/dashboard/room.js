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
import { doc, getDoc } from "firebase/firestore";

export default function DashboardRoom() {
  const { currentUser } = useAuth();
  const [started, setStarted] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [roomCompletedStatus, setRoomCompletedStatus] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const params = new URLSearchParams(window.location.search);
        console.log(params);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          setTeamName(data.teamName);
          setRoomData(data.roomDetails);
          // setRoomData(data)
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
    console.log(router.query);
    // console.log(roomData)

    return (
      <>
        <div className="min-h-screen bg-violet-200 ">
          <DashboardNavbar />
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
                        console.log(game);
                        if (game.name == "bossGame")
                          return <DashboardRoomBossCard details={game} />;
                      });
                    }
                  })}
                </div>

                <div className="flex mx-8 my-12 lg:mt-12 lg:mx-20 justify-center">
                  <h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
                    Tasks
                  </h1>
                </div>
                <div className=" container px-4 md:mx-auto lg:mx-auto sm:mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {roomData.map((room) => {
                      if (room.roomName == name) {
                        return room.games.map((game) => {
                          console.log(game);
                          if (game.name != "bossGame")
                            return <DashboardRoomQuestCard details={game} />;
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
                    <p className="mb-3 mx-6 font-light text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
                      Track work across the enterprise through an open,
                      collaborative platform. Link issues across Jira and ingest
                      data from other software development tools, so your IT
                      support and operations teams have richer contextual
                      information to rapidly respond to requests, incidents, and
                      changes.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center pt-6">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => setStarted(true)}
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
    );
  } else {
    return <NotLoggedIn />;
  }
}
