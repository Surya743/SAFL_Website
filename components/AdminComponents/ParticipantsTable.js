import { useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Modal from "@/components/AdminComponents/Modal";
import UpdatedAlert from "../Alerts/UpdatedAlert";

export default function ParticipantsTable({ search, data }) {
  const [updated,setUpdated] = useState(false);
  const [modalInfo,setModalInfo] = useState({})
  const [open, setOpen] = useState(false);


  function setAlert(gamePoints,gameHealth,gameCompleted){

    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
    }, 3000);

    data.map(team => {
      if(team.uid == modalInfo.uid){
        team.gamePoints = gamePoints
        team.gameHealth = gameHealth
        team.gameCompleted = gameCompleted
      }
      return team
    })
  }

  const handleModal = (team) => {
    (team)
    setModalInfo(team)
    setOpen(true)
  }


const ModalContent = () => {
  // setOpen(true)
  return <Modal open={open} setOpen={setOpen}  user={modalInfo} setAlert={setAlert}/>
}

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {updated &&
      <UpdatedAlert show={updated} setShow={setUpdated}/>

      }
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              
              <ModalContent/>
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
                      Game Points
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Game Health
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Completion Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
               
                  {data
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.teamName.toLowerCase().includes(search);
                    })
                    .map((team) => (
                      <>
                     
                        <tbody className="divide-y divide-gray-200 bg-white">
                          
                        <tr className="hover:bg-gray-100" key={team.uid}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {team.teamName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {team.gamePoints}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {team.gameHealth}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {team.gameCompleted && <span>Completed</span>}
                            {!team.gameCompleted && <span>Pending</span>}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                            <a
                              
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => {
                                  handleModal(team)
                              }}
                            >
                              Edit{" "}
                              <span className="sr-only">, {team.teamName}</span>
                            </a>
                          </td>
                        </tr>
                </tbody>

                      </>
                    ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
