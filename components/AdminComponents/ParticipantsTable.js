const teams = [
  {
    teamName: "Akatsuki",
    roomPoints: 60,
    roomHealth: 60,
    completionStatus: "Completed",
  },
  {
    teamName: "Kara",
    roomPoints: 30,
    roomHealth: 30,
    completionStatus: "Pending",
  },
  {
    teamName: "Akatsuki",
    roomPoints: 60,
    roomHealth: 60,
    completionStatus: "Completed",
  },
  {
    teamName: "Kara",
    roomPoints: 30,
    roomHealth: 30,
    completionStatus: "Pending",
  },
  {
    teamName: "Akatsuki",
    roomPoints: 60,
    roomHealth: 60,
    completionStatus: "Completed",
  },
  {
    teamName: "Kara",
    roomPoints: 30,
    roomHealth: 30,
    completionStatus: "Pending",
  },
];

export default function ParticipantsTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Team Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Room Points
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Room Health
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Completion Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {teams.map((team) => (
                    <tr className="hover:bg-gray-100" key={team.teamName}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {team.teamName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {team.roomPoints}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {team.roomHealth}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {team.completionStatus}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {team.teamName}</span>
                        </a>
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
  );
}
