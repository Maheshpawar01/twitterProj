import React from "react";
import Avatar from "react-avatar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import useGetProfile from '../hooks/useGetProfile'
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { followingUpdate } from "../redux/userSlice";


const Profile = () => {

  const {user, profile} = useSelector(store=>store.user);
  const {id} = useParams();
  //custome hooks
  // const id ="mahesh";
  // console.log(user?._id)
  useGetProfile(id);
  // useGetProfile(profile?._id);
  const dispatch =  useDispatch();

  const followAndUnfollowHandler = async()=>{
    //follow and unfollow logic
    if(user.following.includes(id)){
      //unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
      }

    }else{
      //follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
        dispatch(followingUpdate(id));
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error);

      }

    }
  }

  return (
    <div className="w-[50%] border-l border-r border-gray-300">
      <div>
        <div className="flex items-center py-2">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
            <IoIosArrowRoundBack size={"24px"} />
          </Link >
          <div className="ml-2">
          <h1 className=" font-bold text-lg">{profile?.name}</h1>
          <p className="text-gray-500 text-sm"> 10 Post</p>
          </div>
        </div>
        <img
          src="https://i.pinimg.com/originals/1e/e3/c7/1ee3c7f298a5813ff8f8f13907191701.jpg"
          alt="Banner Image"
        />
        <div className="absolute top-52 ml-4 border-4 border-white rounded-full">
        <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" size="120" round={true} />

        </div>

          <div className="text-right m-4">
          {
              profile?._id === user?._id ? (
                <button className="px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200">Edit Profile</button>    
              ):(
                <button onClick={followAndUnfollowHandler} className="px-4 py-1 bg-black rounded-full border border-gray-400 hover:bg-gray-200 hover:text-black text-white">{user.following.includes(id) ? "Following" : "Follow"}</button>    
              )
            }
          </div>

          <div className="m-4">
            <h1 className="font-bold text-xl">{profile?.name}</h1>
            <p>{`@${profile?.username}`}</p>
          </div>
          <div className="m-4 text-sm">
            <p>You bio comes here Hello every one this is my bio</p>
          </div>
      </div>
    </div>
  );
};

export default Profile;
