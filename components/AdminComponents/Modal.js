import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";

export default function Modal({ open, setOpen, user }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (modalData) => {
    console.log(modalData);
    console.log("test");
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const urlSearchParams = new URLSearchParams(window.location.search);
      const country = urlSearchParams.get("country");
      const gameName = urlSearchParams.get("gameName");
      if (docSnap.exists()) {
        const data = docSnap.data();
        let temp = userData.roomDetails.map((room) => {
          if (room.roomName == country) {
            room.roomPoints += modalData.points;
            room.roomHealth += modalData.health;
            return room.games.map((game) => {
              if (game.name == gameName) {
                game.points = game.points + modalData.points;
                game.health = game.health + modalData.health;
                game.completed = modalData.completion;
              }
              return game;
            });
          }
          return room;
        });
        let totalPoints = data.totalPoints + modalData.points;
        let totalHealth = data.totalHealth + modalData.health;
        await updateDoc(docRef, {
          roomDetails: temp,
          totalPoints: totalPoints,
          totalHealth: totalHealth,
        }).then((event) => {
          console.log(event);
        });
        setRoomData(data.roomDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelButtonRef = useRef(null);

  return (
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
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-80">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="grid gap-6 mb-6 flex flex-row justify-center">
                          <div>
                            <label
                              htmlFor="points"
                              className="text-base font-semibold leading-6 text-purple-800"
                            >
                              Add Points
                            </label>
                            <input
                              type="number"
                              id="points"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                              placeholder="0"
                              {...register("points")}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="health"
                              className="text-base font-semibold leading-6 text-purple-800"
                            >
                              Add Health
                            </label>
                            <input
                              type="number"
                              id="health"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                              placeholder="0"
                              {...register("health")}
                            />
                          </div>
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
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 pb-3 flex flex-row-reverse px-6 justify-center">
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
                      onClick={() => setOpen(false)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
