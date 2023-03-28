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
import { useEffect, useState,useRef } from "react";
import { useRouter } from "next/router";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import ParticipantsTable from "@/components/AdminComponents/ParticipantsTable";
import Searchbar from "@/components/AdminComponents/Searchbar";
import TablePagination from "@/components/AdminComponents/TablePagination";

export default function Participants() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState([]);
  const dataFetchedRef = useRef(false);


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
        
        documentSnapshots.docs.map((doc) => {

          
          doc.data().roomDetails.map((room) => {
            if (room.roomName == country) {
              return room.games.map((game) => {
                if (game.name == gameName) {
                  
                  setTeams((prev) => [...prev,{uid : doc.data().uid,teamName : doc.data().teamName,gameCompleted:game.completed,gamePoints : game.points,gameHealth:game.health}])

                }
              });
            }
          });


        });
      } catch (error) {
        console.log(error);
      }
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  if (currentUser && teams) {
    const router = useRouter();
    const { country, gameName } = router.query;

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
          <ParticipantsTable search={search} data={teams} />
        </div>
      </>
    );
  } else {
    return <NotLoggedIn />;
  }
}
