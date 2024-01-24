import { useState } from 'react';
import '../App.css';
import { db } from '../firebase-config';
import { doc, getDoc } from '@firebase/firestore';

function Login() {
  const [username, setUsername] = useState("");

  const LoginUser = async () => {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
    //window.location.reload();
  };
 
  return (
    <div className='text-white'>
        <h1 className=' w-screen text-center mt-8 text-4xl font-bold'>Taskify</h1>
        <p className='w-screen text-center mt-5'>Login</p>
        <div className='text-center mt-16'>
            <span>Enter your Username : </span>
            <input className='mx-4 text-black' type="text" placeholder='Username' onChange={(event) => { setUsername(event.target.value)}} />
            <br />
            <button onClick={LoginUser} className='bg-slate-700 m-4 p-2 w-20 rounded-md'>Login</button>
            <p>Haven't logged in yet? Register <a href="./register">here</a></p>
        </div>
    </div>
    
  );
}

export default Login;
