import { useState } from 'react';
import '../App.css';
import { db } from '../firebase-config';
import { setDoc, doc } from '@firebase/firestore';

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const CreateUser = async () => {
    await setDoc(doc(db, "users", username), { Username: username, Name: name });
    window.location.reload()
  };
 
  return (
    <div className='text-white'>
        <h1 className=' w-screen text-center mt-8 text-4xl font-bold'>Taskify</h1>
        <p className='w-screen text-center mt-5'>Registration</p>
        <div className='text-center mt-16'>
            <span>Enter your Username : </span>
            <input className='mx-4 text-black' type="text" placeholder='Username' onChange={(event) => { setUsername(event.target.value)}} />
            <br />
            <span>Enter your Name : </span>
            <input className='mx-4 text-black' type="text" placeholder='Name' onChange={(event) => { setName(event.target.value)}} />
            <br />
            <button onClick={CreateUser} className='bg-slate-700 m-4 p-2 w-20 rounded-md'>Register</button>
        </div>
    </div>
    
  );
}

export default Register;
