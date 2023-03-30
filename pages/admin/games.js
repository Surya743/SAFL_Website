import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import GameCards from "@/components/AdminComponents/GameCards";
import BossGameCard from "@/components/AdminComponents/BossGameCard";
import AdminNavbar from "@/components/AdminComponents/AdminNavbar";

export default function Participants() {
  const { currentUser } = useAuth();
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const params = new URLSearchParams(window.location.search);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRoomData(data.roomDetails);
          // setRoomData(data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (currentUser && currentUser.uid == process.env.NEXT_PUBLIC_ADMIN) {
    const router = useRouter();
    const { country } = router.query;
    return (
      <>
        <div className="bg-violet-200 min-h-screen ">
          <AdminNavbar />
          <div className="flex mx-8 my-8 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
              {country.charAt(0).toUpperCase() + country.slice(1)}
            </h1>
          </div>
          <div className="flex mx-8 my-12 lg:mt-12 lg:mx-20 justify-center">
            <h1 className="text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
              Main Boss
            </h1>
          </div>
          <div className="flex justify-center items-center pt-0 mx-4">
            {roomData.map((room) => {
              if (room.roomName == country) {
                return room.games.map((game) => {
                  if (game.bossGame == true)
                    return (
                      <BossGameCard gameName={game.name} roomName={country} />
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
                if (room.roomName == country) {
                  return room.games.map((game) => {
                    if (game.bossGame != true)
                      return (
                        <GameCards gameName={game.name} roomName={country} />
                      );
                  });
                }
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
