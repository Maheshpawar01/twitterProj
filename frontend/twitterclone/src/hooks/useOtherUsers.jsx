// import React, { useEffect } from 'react'
// import axios from "axios"
// import { USER_API_END_POINT } from '../utils/constant'
// import { useDispatch } from 'react-redux'
// import { getMyProfile, getOtherUsers } from '../redux/userSlice'
// // import { getOtherUsers } from '../redux/actions'; // Assuming getOtherUsers action is correctly implemented

// const useOtherUsers = (id) => {
//   const dispatch = useDispatch();
//    useEffect(()=>{
//     const fetchOtherUsers = async()=>{
//       try {
//         const res = await axios.get(`${USER_API_END_POINT}/otherUser/${id}`,{
//           withCredentials:true
//         });
//         console.log(res)
//         dispatch(getOtherUsers(res.data.otherUsers))
//     } catch (error) {
//         console.log(error)
//     }
//     }
//     fetchOtherUsers();

//    }, [])

// }

// export default useOtherUsers;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getOtherUsers } from '../redux/userSlice'; // Adjust path to your userSlice file

const useOtherUsers = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/otherUser/${id}`, {
          withCredentials: true // Adjust as per your API requirements
        });
        dispatch(getOtherUsers(res.data.otherUsers)); // Dispatch action with fetched otherUsers data
      } catch (error) {
        console.error('Error fetching other users:', error);
        // Handle error as needed (e.g., show error message, retry logic)
      }
    };

    if (id) {
      fetchOtherUsers();
    }

    return () => {
      // Cleanup function if necessary
    };
  }, [dispatch, id]); // Ensure dispatch and id are in the dependency array

  // Optionally return any data or functions if needed by the component using this hook
};

export default useOtherUsers;
