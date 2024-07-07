import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast"
import {useDispatch, useSelector} from 'react-redux'
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';
import { TWEET_API_END_POINT } from '../utils/constant';

const CreatePost = () => {
  const [description, setDescription] = useState("")
  const {user} = useSelector(store=>store.user)
  const {isActive} = useSelector(store=>store.tweet)
  const dispatch = useDispatch();
  const submitHandler = async () =>{
    try {
      const res = await axios.post(`${ TWEET_API_END_POINT}/create`, {description, id:user?._id},{
        withCredentials:true,
      })
      dispatch(getRefresh())
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
    setDescription("")
  }

  const forYouHandler = ()=>{
    dispatch(getIsActive(true))
  }
  const followingHandler = ()=>{
    dispatch(getIsActive(false))
  }


  return (
    <div >
     <div>
        <div className='flex items-center justify-between border-b border-gray-200'>
        <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-500" : "border-b-4 border-transparent"} hover:bg-gray-200 w-full text-center px-4 py-2`}>
            <h1  className='font-semibold text-gray-500 text-lg cursor-pointer'>For You</h1>
        </div>
        <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-500" : "border-b-4 border-transparent"} hover:bg-gray-200 w-full text-center px-4 py-2`}>
            <h1  className='font-semibold text-gray-500 text-lg cursor-pointer'>Following</h1>
        </div>
      </div>
      {/* twitt section */}
      <div>
        <div className='flex items-center p-4'>
            <div>
            <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" size="40" round={true} />
            </div>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full outline-none border-none text-xl ml-2 p-2 border border-gray-300 rounded-md resize-none overflow-hidden break-words' type="text" placeholder='What is happening?' />
        </div>

        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <div>
            <CiImageOn size={'24px'}/>
          </div>
        <button onClick={submitHandler} className='px-4 py-1 border-none text-medium bg-[#109BF0] rounded-full text-white font-bold'>Post</button>

        </div>
      </div>
        </div>
      
    </div>
  )
}

export default CreatePost