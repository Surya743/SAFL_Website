import DashboardNavbar from "@/components/DashboardComponents/DashboardNavbar"

const people = [
    { rank: '1', teamName: 'Test', teamLeader: 'Test', points: '100' },
    { rank: '1', teamName: 'Test', teamLeader: 'Test', points: '100' },
    { rank: '1', teamName: 'Test', teamLeader: 'Test', points: '100' },
    { rank: '1', teamName: 'Test', teamLeader: 'Test', points: '100' },
    { rank: '1', teamName: 'Test', teamLeader: 'Test', points: '100' },
    { rank: '1', teamName: 'Test', teamLeader: 'Test', points: '100' },

  ]
  
  export default function Leaderboard() {
    return (
        <>
        <DashboardNavbar/>
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
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Rank
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Team Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Team Leader
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Points
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.rank}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.rank}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.teamName}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.teamLeader}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.points}</td>
                        
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
        
    )
  }