import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import ParticipantsTable from "@/components/AdminComponents/ParticipantsTable";
import Searchbar from "@/components/AdminComponents/Searchbar";
import TablePagination from "@/components/AdminComponents/TablePagination";

export default function Participants() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState([]);
  // let teams = [];

  useEffect(() => {
    async function fetchData() {
      try {
        // Query the first page of docs
        const urlSearchParams = new URLSearchParams(window.location.search);
        const country = urlSearchParams.get("country");
        const gameName = urlSearchParams.get("gameName");

        const documentQuery = query(
          collection(db, "users"),
          orderBy("currency", "desc")
        );

        const documentSnapshots = await getDocs(documentQuery);
        let temp = {};

        documentSnapshots.docs.map((doc) => {
          temp.uid = doc.data().uid;
          temp.teamName = doc.data().teamName;
          // console.log(temp);
          doc.data().roomDetails.map((room) => {
            if (room.roomName == country) {
              return room.games.map((game) => {
                if (game.name == gameName) {
                  temp.gamePoints = game.points;
                  temp.gameHealth = game.health;
                  temp.gameCompleted = game.completed;
                  console.log(temp);
                  // setTeams((team) => [...team, temp]);
                }
              });
            }
            console.log(teams);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (currentUser) {
    const router = useRouter();
    const { country, gameName } = router.query;
    // console.log(teams);

    return (
      <>
        <div className="bg-violet-200 min-h-screen">
          <DashboardNavbar />
          <div className="flex mx-8 my-8 lg:mt-16 lg:mx-20 justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
              {gameName} ({country.charAt(0).toUpperCase() + country.slice(1)})
            </h1>
          </div>
          <div className="flex justify-center ">
            <Searchbar setSearch={setSearch} />
          </div>
          <ParticipantsTable search={search} />
          <TablePagination />
        </div>
      </>
    );
  } else {
    return <NotLoggedIn />;
  }
}
