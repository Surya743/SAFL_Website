export default function DashboardRoomQuestCard(props) {
  return (
    <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grow">
        <div className="flex justify-center items-center">
          <div className="mb-1 text-xl font-medium text-purple-700 dark:text-purple-500">
            Quest {props.number}
          </div>
        </div>

        <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" />
        </div>

        <div className="flex gap-2 mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="mb-1 text-base font-medium text-purple-700 dark:text-purple-500">
            Room Points Achieved
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="mb-1 text-base font-medium text-purple-700 dark:text-purple-500">
            Time taken to complete room
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Begin!
          </button>
        </div>
      </div>
    </div>
  );
}
