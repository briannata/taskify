import { useState } from 'react';
import '../App.css';
import { db } from '../firebase-config';
import { setDoc, doc, getDoc } from '@firebase/firestore';
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [usernameError, setUsernameError] = useState("")
  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUsernameError("Username already exists. Please try a different username.");
    } else {
      await setDoc(doc(db, "users", username), { Username: username, Name: name, Classes: [] });
      navigate("/" + username);
    }

  };
 
  return (
    <div className='text-white mainContainer'>
        <div className='titleContainer'>
            <div className=' w-screen text-center mt-8 text-4xl font-bold'>Taskify Registration</div>
        </div>
        <br />
        <br />
        <form className='text-center mt-16' onSubmit={onFormSubmit}>
        <div className='inputContainer'>
                <input className='mx-4 text-black inputBox' type="text" placeholder='Enter your username here' onChange={(event) => { setUsername(event.target.value)}} />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className='inputContainer'>
            <input className='mx-4 text-black inputBox' type="text" placeholder='Enter your name here' onChange={(event) => { setName(event.target.value)}} />
            </div>
            <br />
            <div className='buttonContainer'>
                <button type="submit" className='bg-slate-700 m-4 p-2 w-20 rounded-md'>Login</button>
            </div>
        </form>
    </div>
    
  );
}

export default Register;
