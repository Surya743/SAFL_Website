export default function RoomStatusCard({
  // roomHealth,
  roomPoints,
  completedGames,
  roomGamesCount,
}) {
  return (
    <div className="block w-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <div className="flex justify-center items-center">
        <div className="mb-1 text-xl font-medium text-purple-800">Status</div>
      </div>

      <div className="w-full mt-4 bg-gray-200 rounded-full h-4">
        <div
          className="text-red-300 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 text-xs font-medium text-center p-0.5 leading-none h-4 rounded-full"
          style={{ width: `${(completedGames / roomGamesCount) * 100}%` }}
        >
          {parseInt((completedGames / roomGamesCount) * 100)}%
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
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <div className="mb-1 text-base font-medium text-purple-800">
          Total Points: {roomPoints}
        </div>
      </div>

      {/* <div className="flex gap-2 mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-6 h-6"
        >
          <path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z" />
        </svg>
        <div className="mb-1 text-base font-medium text-purple-800">
          Total Health: {roomHealth}
        </div>
      </div> */}

      <div className="flex justify-center pt-6">
        <a
          href="/dashboard/leaderboard"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Leaderboard
        </a>
      </div>
    </div>
  );
}
