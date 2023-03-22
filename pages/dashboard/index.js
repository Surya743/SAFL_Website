import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import DashboardRoomCards from "@/components/DashboardComponents/DashboardRoomCards";
import DashboardStatusCard from "@/components/DashboardComponents/DashboardStatusCard";
import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function DashboardRoom() {
  const { currentUser } = useAuth();
  // console.log(currentUser)
  const [loading, isLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalHealth, setTotalHealth] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTeamName(data.teamName);
          setRoomData(data.roomDetails);
          // console.log(roomData);
          let totalPointstemp = 0;
          let totalHealthtemp = 0;
         // console.log(roomData);
          data.roomDetails.map((room) => {
            //console.log(room.roomPoints);
            totalPointstemp = totalPointstemp + room.roomPoints;
            totalHealthtemp = totalHealthtemp + room.roomHealth;
          });
          //console.log(totalPointstemp);
          setTotalPoints(totalPointstemp);
          setTotalHealth(totalHealthtemp);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  if (currentUser) {
    return (
      <>
        <div className="bg-violet-200 ">
          <DashboardNavbar />
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
              totalHealth={totalHealth}
            />
          </div>

          <div className="flex mx-8 my-12 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
              Rooms
            </h1>
          </div>
          <div className=" container px-4 md:mx-auto lg:mx-auto sm:mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {/* <DashboardRoomCards number="1" room="japan" />
              <DashboardRoomCards number="2" room="germany" />
              <DashboardRoomCards number="3" room="korea" />
              <DashboardRoomCards number="4" room="spain" />
              <DashboardRoomCards number="5" room="france" />
              <DashboardRoomCards number="6" room="india" /> */}
              {roomData.map((room) => {
                return (
                  <DashboardRoomCards
                    roomName={room.roomName}
                    roomPoints={room.roomPoints}
                    roomHealth={room.roomHealth}
                    roomTime={room.endTime - room.startTime}
                  />
                );
              })}
            </div>
          </div>

          <DashboardFooter />
        </div>
      </>
    );
  } else {
    return <NotLoggedIn />;
  }
}
