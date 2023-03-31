import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import Loading from "@/components/Errors/Loading";
import AdminNavbar from "@/components/AdminComponents/AdminNavbar";

export default function Leaderboard() {
  const { currentUser } = useAuth();
  const [teams, setTeams] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        // Query the first page of docs
        const documentQuery = query(
          collection(db, "users"),
          orderBy("currency", "desc")
        );
        const documentSnapshots = await getDocs(documentQuery);
        setTeams(documentSnapshots.docs);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (currentUser && teams) {
    return (
      <>
      {currentUser.uid != process.env.NEXT_PUBLIC_ADMIN ?
      <DashboardNavbar/> :
      <AdminNavbar/>
      }
      
        <div className="px-4 sm:px-6 lg:px-8 bg-violet-200 h-screen">
          <div className="flex justify-center items-center pt-8 lg:py-8 md:py-4">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
                {" "}
                Leaderboard
              </span>
            </h1>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Rank
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Team Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Team Leader
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Currency
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {teams.map((team, index) => (
                        <tr key={team.data().email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {team.data().teamName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {team.data().teamLeaderName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {team.data().currency}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (!currentUser) {
    return <NotLoggedIn />;
  } else {
    return <Loading />;
  }
}
