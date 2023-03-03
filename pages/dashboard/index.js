import DashboardFooter from "@/components/DashboardComponents/DashboardFooter";
import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar";
import DashboardRoomCards from "@/components/DashboardComponents/DashboardRoomCards";
import DashboardStatusCard from "@/components/DashboardComponents/DashboardStatusCard";

export default function DashboardHome() {
  return (
    <>
      <div className="bg-violet-200 ">
        <DashboardNavbar />
        <div className="flex mx-8 my-8 lg:mt-32 lg:mx-20 justify-center">
          <div>
            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Welcome to
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
                {" "}
                Around the World!
              </span>
            </h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Complete our tasks to win the grand prize{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center pt-8 mx-4">
          <DashboardStatusCard />
        </div>


        <div className="flex mx-8 my-12 lg:mt-32 lg:mx-20 justify-center">
          
            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">              
              <span class="text-transparent text-center bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">                
                Tasks
              </span>
            </h1>
          
        </div>    
        <div className="mx-12 md:mx-8 ">
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 justify-items-center ">
            
            <DashboardRoomCards/>    
            <DashboardRoomCards/>            
            <DashboardRoomCards/>            
            <DashboardRoomCards/>            

            
        </div>
        </div>
        
        <DashboardFooter/>
      </div>

     


    </>
  );
}
