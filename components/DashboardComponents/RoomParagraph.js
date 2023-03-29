import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function RoomParagraph({ roomName }) {
  const [description, setDescription] = useState("");
  useEffect(() => {
    async function description() {
      try {
        const docRefDesc = doc(db, "descriptions", roomName);
        const docSnapDesc = await getDoc(docRefDesc);
        if (docSnapDesc.exists()) {
          const data = docSnapDesc.data();
          setDescription(data.roomDescription);
        } else {
          ("Doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
    }

    description();
  }, []);

  return (
    <>
      <p className="mb-3 mx-6 font-light text-gray-500 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-3 first-letter:float-left">
        {description}
      </p>
    </>
  );
}
