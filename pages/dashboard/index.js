import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import DashboardRoomCards from "@/components/DashboardComponents/DashboardRoomCards";
import DashboardStatusCard from "@/components/DashboardComponents/DashboardStatusCard";
import Loading from "@/components/Errors/Loading";
import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";

export default function DashboardRoom() {
  const { currentUser } = useAuth();
  // console.log(currentUser)
  const [loading, isLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalHealth, setTotalHealth] = useState(0);
  const [roomGamesCount, setRoomGamesCount] = useState(0);
  const [totalGamesCount, setTotalGamesCount] = useState(0);
  const [totalCompletedGamesCount, setTotalCompletedGamesCount] = useState(0);
  const [roomCompletedGamesCount, setRoomCompletedGamesCount] = useState(0);
  const [globalStart, setGlobalStart] = useState(0);
  const [globalEnd, setGlobalEnd] = useState(0);

  const dataFetchedRef = useRef(false);

  const getRoomCount = (roomDetails) => {
    let tempGameCount = 0;
    let tempGameCompletedCount = 0;
    roomDetails;

    roomDetails.games.map((game) => {
      tempGameCount += 1;
      if (game.completed == true) {
        tempGameCompletedCount += 1;
      }
    });

    return {
      gameCount: tempGameCount,
      completedGameCount: tempGameCompletedCount,
    };
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGlobalStart(data.globalStart);
          setGlobalEnd(data.globalEnd);
          setTeamName(data.teamName);
          setRoomData(data.roomDetails);
          let totalPointstemp = data.totalPoints;
          let totalHealthtemp = data.totalHealth;

          setTotalPoints(totalPointstemp);
          setTotalHealth(totalHealthtemp);

          data.roomDetails.map((room) => {
            room.games.map((game) => {
              setTotalGamesCount((count) => count + 1);
              if (game.completed == true) {
                setTotalCompletedGamesCount((count) => count + 1);
              }
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);
  if (currentUser && teamName) {
    return (
      <>
        <div className="bg-violet-200 ">
          <DashboardNavbar />
          {/* <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <p class="font-bold">Alert</p>
  <p>Updated Rooms</p>
  <p>Japan F208</p>
  <p>India F205</p>
  <p>Spain G206</p>
  <p>France G208</p>
  <p>Korea F207</p>
  <p>Germany G205</p>

</div> */}

          <div className="flex mx-8 my-8 lg:mt-32 lg:mx-20 justify-center">
            <div>
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
                Welcome {teamName} to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
                  {" "}
                  Around The World!
                </span>
              </h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl">
                Complete our tasks to win the grand prize{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center pt-8 mx-4">
            <DashboardStatusCard
              totalPoints={totalPoints}
              totalCompletedGamesCount={totalCompletedGamesCount}
              totalGamesCount={totalGamesCount}
              globalStart={globalStart}
              globalEnd={globalEnd}
            />
          </div>

          <div className="flex mx-8 my-12 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
              Rooms
            </h1>
          </div>
          <div className=" container px-4 md:mx-auto lg:mx-auto sm:mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {roomData.map((room) => {
                return (
                  <DashboardRoomCards
                    roomNo={room.roomNo}
                    roomName={room.roomName}
                    roomPoints={room.roomPoints}
                    // roomHealth={room.roomHealth}
                    roomTime={room.startTime}
                    roomStarted={room.roomStarted}
                    roomCompleted={room.roomCompletedStatus}
                    roomEndTime={room.endTime}
                    roomGamesCount={getRoomCount(room).gameCount}
                    roomCompletedGamesCount={
                      getRoomCount(room).completedGameCount
                    }
                  />
                );
              })}
            </div>
          </div>

          <DashboardFooter />
        </div>
      </>
    );
  } else if (!currentUser) {
    return <NotLoggedIn />;
  } else {
    return <Loading />;
  }
}
