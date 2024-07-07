import React from 'react';
import { CiHome } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';


const LeftSidebar = () => {
  const {user, profile} = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = async()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      // dispatch(getMyProfile(null));
      navigate('/login')
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className='w-[20%]'>
        <div>
            <img className='ml-5' width={"24px"} src="https://loodibee.com/wp-content/uploads/Twitter-X-Logo.png" alt="twtterlogo" />
        </div>
        <div className='my-4'>
            <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <CiHome size={"24px"}/> 
            <h1 className='font-bold text-lg ml-2'>Home</h1>
            </Link>
            
            <Link to="/explore" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <CiSearch size={"24px"}/> 
            <h1 className='font-bold text-lg ml-2'>Explore</h1>
            </Link>
            
            <Link to="notification" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <IoIosNotificationsOutline size={"24px"}/> 
            <h1 className='font-bold text-lg ml-2'>Notification</h1>
            </Link>
            
            <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <IoPersonOutline size={"24px"}/> 
            <h1 className='font-bold text-lg ml-2'>Profile</h1>
            </Link>
            
            <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <CiBookmark size={"24px"}/> 
            <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
            </div>
            
            <div onClick={logOutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <CiLogout size="24px"/> 
            <h1 className='font-bold text-lg ml-2'>Logout</h1>
            </div>
            <button className='px-4 py-2 border-none text-medium bg-[#109BF0] w-full rounded-full text-white font-bold'>Post</button>
        </div>
    </div>
  )
}

export default LeftSidebar;