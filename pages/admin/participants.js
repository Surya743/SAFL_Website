import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import ParticipantsTable from "@/components/AdminComponents/ParticipantsTable";
import Searchbar from "@/components/AdminComponents/Searchbar";
import TablePagination from "@/components/AdminComponents/TablePagination";

export default function Participants() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <>
        <div className="bg-violet-200 min-h-screen">
          <DashboardNavbar />
          <div className="flex mx-8 my-8 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
              Participants
            </h1>
          </div>
          <Searchbar />
          <ParticipantsTable />
          <TablePagination />
        </div>
      </>
    );
  } else {
    return <NotLoggedIn />;
  }
}
