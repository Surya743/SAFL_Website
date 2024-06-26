import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
export default function Modal({ open, setOpen, user, setAlert }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (modalData) => {
    setOpen(false);

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const urlSearchParams = new URLSearchParams(window.location.search);
      const country = urlSearchParams.get("country");
      const gameName = urlSearchParams.get("gameName");

      if (docSnap.exists()) {
        const data = docSnap.data();
        let gamePoints = 0;
        let gameHealth = 0;
        let gameCompleted = false;
        let totalGames = 0;
        let totalGamesCompleted = 0;
        let totalRooms = 0;
        let totalRoomsCompleted = 0;
        let oldGamePoints = 0;
        let temp = data.roomDetails.map((room) => {
          totalRooms += 1;
          if (room.roomCompletedStatus == true) {
            totalRoomsCompleted += 1;
          }
          if (room.roomName == country) {
           
            room.games.map((game) => {
              if (game.name == gameName) {
                 room.roomPoints = room.roomPoints - game.points + parseInt(modalData.points);
            room.roomHealth = room.roomHealth - game.health + parseInt(modalData.health);
                oldGamePoints = game.points                
                game.points =
                  parseInt(modalData.points);
                gamePoints = game.points;
                game.health =
                  parseInt(game.health) + parseInt(modalData.health);
                gameHealth = game.health;
                game.completed = Boolean(modalData.completion);
                gameCompleted = game.completed;
              }
              if (game.completed) {
                totalGamesCompleted += 1;
              }
              totalGames += 1;
              return game;
            });
            console.log(totalGames, totalGamesCompleted);
            if (totalGamesCompleted == totalGames) {
              room.endTime = Date.now();
              room.roomCompletedStatus = true;
              totalRoomsCompleted += 1;
            }
          }
          return room;
        });
        let totalPoints =
          parseInt(data.totalPoints) - oldGamePoints + parseInt(modalData.points);
        let totalHealth =
          parseInt(data.totalHealth) + parseInt(modalData.health);

        if (totalRoomsCompleted == totalRooms) {
          await updateDoc(docRef, {
            roomDetails: temp,
            totalHealth: totalHealth,
            totalPoints: totalPoints,
            currency: totalPoints,
            globalEnd: Date.now(),
          });
        }
        await updateDoc(docRef, {
          roomDetails: temp,
          totalHealth: totalHealth,
          totalPoints: totalPoints,
          currency: totalPoints,
        });

        setAlert(gamePoints, gameHealth, gameCompleted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white px-4 pb-3 px-6 justify-center">
                      <div className=" py-6 grid gap-6 mb-6 flex flex-row justify-center">
                        <div>
                          <label
                            htmlFor="points"
                            className="text-base font-semibold leading-6 text-purple-800"
                          >
                            Update Points
                          </label>
                          <input
                            id="points"
                            type="number"
                            defaultValue={0}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                            required
                            {...register("points")}
                          />
                        </div>
                        {/* <div>
                          <label
                            htmlFor="health"
                            className="text-base font-semibold leading-6 text-purple-800"
                          >
                            Add Health
                          </label>
                          <input
                          type="number"
                            id="health"
                            defaultValue={0}

                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                            required
                            {...register("health")}
                          />
                        </div> */}
                        <label className="relative inline-flex items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultValue
                            className="sr-only peer"
                            {...register("completion")}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" />
                          <span className="text-base font-semibold leading-6 text-purple-800 mx-5">
                            Completed
                          </span>
                        </label>
                      </div>
                      <div className="bg-white px-4 pb-3 px-6 flex flex-row-reverse justify-center">
                        <button
                          type="button"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3 mb-2"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-2"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
