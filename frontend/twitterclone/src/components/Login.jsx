import React, { useState } from 'react';
import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant.jsx"
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice.jsx';

const Login = () => {
  const [islogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) =>{
    e.preventDefault()

    if(islogin){
      //login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, {email, password},{
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials:true
        });
        dispatch(getUser(res?.data?.user));
        if(res.data && res.data.success){
          navigate("/");
          toast.success(res.data.message)
        }
        // console.log(res)
      } catch (error) {
        toast.success(error.response && error.response.data && error.response.data.message);
        console.log(error)
      }

    }else{
      //signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, {name, username, email, password},{
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials:true
        });
        if(res.data.success){
          toast.success(res.data.message)
        }
        // console.log(res)

      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
      }
    }
  }

  const loginSignupHandler = () =>{
    setIsLogin(!islogin)
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
        <img className='ml-5' width={"300px"} src="https://loodibee.com/wp-content/uploads/Twitter-X-Logo.png" alt="twtterlogo" />
        </div>
        <div >
          <div className='my-5'>
            <h1 className="font-bold text-7xl">Hapenning Now</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{islogin ? "Login" : "SignUp"}</h1>
          <form action="" onSubmit={submitHandler} className='flex flex-col w-[55%] '>
            {
              !islogin && (<>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' className='outline-blue-500 border border-gray-500 rounded-full px-3 py-2 my-1 font-semibold' />
              <input type="text" value={username} onChange={(e)=>setusername(e.target.value)} placeholder='Username' className='outline-blue-500 border border-gray-500 rounded-full px-3 py-2 my-1 font-semibold'/>  
              </>)
            }
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='outline-blue-500 border border-gray-500 rounded-full px-3 py-2 my-1 font-semibold'/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='outline-blue-500 border border-gray-500 rounded-full px-3 py-2 my-1 font-semibold'/>
            <button className='bg-[#1D9BF0] border-none my-4 py-2 rounded-full tex-lg text-white'>{islogin ? "Login" : "Creat Account"}</button>
            <h1>{islogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-500 cursor-pointer'>{islogin ? "SignUp" : "login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login