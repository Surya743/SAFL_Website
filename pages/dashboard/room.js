import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import DashboardRoomQuestCard from "@/components/DashboardComponents/DashboardRoomQuestCard";
import DashboardRoomBossCard from "@/components/DashboardComponents/DashboardRoomBossCard";
import DashboardStatusCard from "@/components/DashboardComponents/DashboardStatusCard";
import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRoom() {
  const { currentUser } = useAuth();

  if (currentUser) {
    const router = useRouter();
    const { room } = router.query;

    function getCountry(room) {
      let country = {
        f202: "Japan",
        f203: "Germany",
        f205: "Korea",
        f206: "Spain",
        f207: "France",
        f208: "India",
      }[room];
      return country;
    }
    return (
      <>
        <div className="bg-violet-200 ">
          <DashboardNavbar />
          <div className="flex mx-8 my-8 lg:mt-32 lg:mx-20 justify-center">
            <div>
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                Welcome to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
                  {" "}
                  {getCountry(room)}!
                </span>
              </h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl">
                Complete our tasks to win the grand prize{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center pt-8 mx-4">
            <DashboardStatusCard />
          </div>
          <div className="flex mx-8 my-12 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
              Main Boss Status
            </h1>
          </div>
          <div className="flex justify-center items-center pt-0 mx-4">
            <DashboardRoomBossCard />
          </div>

          <div className="flex mx-8 my-12 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
              Tasks
            </h1>
          </div>
          <div className=" container px-4 md:mx-auto lg:mx-auto sm:mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <DashboardRoomQuestCard number="1" />
              <DashboardRoomQuestCard number="2" />
              <DashboardRoomQuestCard number="3" />
              <DashboardRoomQuestCard number="4" />
              <DashboardRoomQuestCard number="5" />
              <DashboardRoomQuestCard number="6" />
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
