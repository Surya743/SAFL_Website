import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import GameCards from "@/components/AdminComponents/GameCards";

export default function Participants() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <>
        <div className="bg-violet-200 ">
          <DashboardNavbar />
          <div className="flex mx-8 my-8 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
              Welcome ADMIN!
            </h1>
          </div>
          <div className="flex mx-8 my-12 lg:mt-12 lg:mx-20 justify-center">
            <h1 className="text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
              Main Boss
            </h1>
          </div>
          <div className="flex justify-center items-center pt-0 mx-4">
            {/* Create different boss game card to cover up the space */}
            <GameCards gameName="bossGame" />
          </div>
          <div className="flex mx-8 my-12 lg:mt-12 lg:mx-20 justify-center">
            <h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
              Games
            </h1>
          </div>
          <div className=" container px-4 md:mx-auto lg:mx-auto sm:mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <GameCards gameName="game1" />
              <GameCards gameName="game2" />
              <GameCards gameName="game3" />
              <GameCards gameName="game4" />
              <GameCards gameName="game5" />
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
