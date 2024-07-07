import React from 'react'
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

const RightSidebar = ({otherUsers}) => {
  return (
    <div className='w-[25%]  border border-gray-300'>
      <div className='flex items-center  p-2 bg-gray-200 outline-none rounded-full' >
      <CiSearch size={'24px'}/>
        <input type="text" className='bg-transparent px-2' placeholder='Search'/>
      </div>

      <div className='p-4 bg-gray-100 my-4 rounded-2xl'>
        <h1 className='font-bold text-lg'>Who to Follow</h1>
        {
          otherUsers?.map((user)=>{
            return (
              <div key={user?._id} className='flex items-center justify-between my-3'>
              <div className='flex'>
                <div>
              <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" size="40" round={true} />
                </div>
                <div className='ml-2'>
                  <h1 className='font-bold'>{user?.name}</h1>
                  <p className='text-sm'>{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                <button className='px-4 py-1 bg-black text-gray-200 rounded-full'>Profile</button>
                </Link>
              </div>
            </div>
            )
          })
        }
        


      </div>
    </div>
  )
}

export default RightSidebar