import { ref, set } from "firebase/database";
import { db } from "../firebase/firebase";

export const writeContactFormData = (name: string, email: string, message: string) => {
  
  const timeStamp = Date.now().toString()

  set(ref(db, timeStamp), {
    name,
    email,
    message
  })

}