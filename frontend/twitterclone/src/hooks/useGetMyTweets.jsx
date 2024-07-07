import React, { useEffect } from 'react';
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets } from '../redux/tweetSlice';

// Custom hook to fetch tweets
const useGetMyTweets = (id) => {
  const dispatch = useDispatch(); // Ensure this is called within a Provider context
  const {refresh, isActive} = useSelector(store=>store.tweet)

  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
        withCredentials: true
      });
      console.log(res);
      dispatch(getAllTweets(res.data.tweets)); // Dispatch action to update store
    } catch (error) {
      console.log(error);
    }
  }

  const followingTweetHandler = async()=>{
    // const id = user?._id;
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`)
      console.log(res);
      dispatch(getAllTweets(res.data.tweets));
      // dispatch(getRefresh())
      toast.success(res.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }


  useEffect(() => {

    if(isActive){
      fetchMyTweets();
    }else{
      followingTweetHandler();
    }
   

  },[isActive, refresh]); // Include dispatch in the dependency array
};

export default useGetMyTweets;
