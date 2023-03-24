export default function AdminRoomCards({ roomName }) {
  const urlParams = new URLSearchParams({ country: roomName }).toString();
  const game = "/admin/games?" + urlParams;

  return (
    <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <div className="grow">
        <div className="flex justify-center items-center">
          <div className="mb-1 text-xl font-medium text-purple-800">
            {roomName[0].toUpperCase() + roomName.slice(1)} (F___)
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <a
            // href={{
            //   pathname: "/dashboard/room",
            //   query: { room: props.room },
            // }}
            href={game}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Manage Room
          </a>
        </div>
      </div>
    </div>
  );
}
