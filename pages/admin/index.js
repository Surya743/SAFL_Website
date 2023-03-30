import NotLoggedIn from "@/components/Errors/NotLoggedIn";
import { useAuth } from "@/context/AuthContext";
import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import AdminRoomCards from "@/components/AdminComponents/AdminRoomCards";
import AdminNavbar from "@/components/AdminComponents/AdminNavbar";

export default function AdminDashboard() {
  const { currentUser } = useAuth();

  if (currentUser && currentUser.uid == process.env.NEXT_PUBLIC_ADMIN) {
    return (
      <>
        <div className="bg-violet-200 ">
          <AdminNavbar />
          <div className="flex mx-8 my-8 lg:mt-32 lg:mx-20 justify-center">
            <div>
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl">
                Welcome Admin to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
                  {" "}
                  Around The World!
                </span>
              </h1>
              {/* <p className="text-lg font-normal text-gray-500 lg:text-xl">
                Complete our tasks to win the grand prize{" "}
              </p> */}
            </div>
          </div>
          <div className="flex justify-center items-center pt-0 mx-4"></div>

          <div className="flex mx-8 my-6 lg:mt-32 lg:mx-20 justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
              Rooms
            </h1>
          </div>
          <div className=" container px-4 md:mx-auto lg:mx-auto sm:mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <AdminRoomCards roomNo="F208" roomName="japan" />
              <AdminRoomCards roomNo="G205" roomName="germany" />
              <AdminRoomCards roomNo="G206" roomName="korea" />
              <AdminRoomCards roomNo="G207" roomName="spain" />
              <AdminRoomCards roomNo="G208" roomName="france" />
              <AdminRoomCards roomNo="F205" roomName="india" />
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
