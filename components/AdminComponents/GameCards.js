export default function GameCards({ gameName }) {
  const urlParams = new URLSearchParams({ name: gameName }).toString();
  const url = "/admin/participants/country?" + urlParams;

  return (
    <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <div className="grow">
        <div className="flex justify-center items-center">
          <div className="mb-1 text-xl font-medium text-purple-800">
            {gameName[0].toUpperCase() + gameName.slice(1)}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <a
            // href={{
            //   pathname: "/dashboard/room",
            //   query: { room: props.room },
            // }}
            href={url}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Manage Game
          </a>
        </div>
      </div>
    </div>
  );
}
