import React from 'react'
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';
import { AiOutlineDelete } from "react-icons/ai";
import {timeSince} from "../utils/constant"


const Tweet = ({tweet}) => {
    const {user} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const likeOrDislikeHandler = async(id)=>{
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, {id:user?._id},{
                withCredentials: true
            })
            dispatch(getRefresh())
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const deleteTweetHandler = async(id)=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='border-b border-gray-200'>
        <div>
            <div className='flex p-4'>
            <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" size="40" round={true} />
            <div className='ml-2 w-full'>
            <div className='flex items-center '>
            <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
            <p className='text-gray-500 text-sm ml-2'>{`@${tweet?.userDetails[0]?.username}  . ${timeSince(tweet?.createdAt)}`}</p>
            </div>
            <div>
                <p>{tweet?.description}</p>                
            </div>
            <div className='flex justify-between my-3'>
                <div className='flex items-center hover:text-blue-500 cursor-pointer'>
                    <div className='p-2 hover:bg-blue-100 rounded-full '>
                        <FaRegComment size={"20px"}/>
                    </div>
                    <p >0</p>
                </div>
                <div className='flex items-center hover:text-pink-500 cursor-pointer'>
                    <div onClick={()=>likeOrDislikeHandler(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full   '>
                    <CiHeart size={"24px"}/>
                    </div>
                    <p>{tweet?.like?.length}</p>
                </div>
                <div className='flex items-center hover:text-blue-500 cursor-pointer'>
                      <div className='p-2 hover:bg-blue-200 rounded-full '>
                    <CiBookmark size={"24px"}/>

                    </div>
                    <p>0</p>
                </div>
                {
                    user?._id === tweet?.userId && (
                        
                <div onClick={()=>deleteTweetHandler(tweet?._id)} className='flex items-center hover:text-red-600 cursor-pointer'>
                <div className='p-2 hover:bg-red-200 rounded-full '>
              <AiOutlineDelete size={"24px"}/>

              </div>
              {/* <p>0</p> */}
          </div>
                    )
                }

            </div>
            </div>
            </div>
            </div>
        </div>
  )
}

export default Tweet