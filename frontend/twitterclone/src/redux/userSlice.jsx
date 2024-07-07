import {createSlice} from "@reduxjs/toolkit";
// import { getMyProfile } from "../../../../backend/controllers/UserController";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUsers:null,
        profile:null,
    },
    reducers:{
        //multiple actions
        getUser:(state, action)=>{
            console.log("getUser action payload:", action.payload); // Add this line for debugging
            state.user = action.payload;
        },
        getOtherUsers:(state,action)=>{
            state.otherUsers = action.payload;
        },
        //backend se nahi leke aana (create it like above )
        getMyProfile:(state, action)=>{
            state.profile = action.payload;
        },
        followingUpdate:(state, action)=>{
            //unfollow
            if(state.user.following.includes(action.payload)){
                state.user.following = state.user.following.filter((itemId)=>{
                    return itemId !== action.payload;
                })

            }else{
                //follow
                state.user.following.push(action.payload)
            }
        }

        // followingUpdate: (state, action) => {
        //     console.log("Before update:", state.user.following);

        //     if (state.user.following.includes(action.payload)) {
        //       state.user.following = state.user.following.filter(
        //         (itemId) => itemId !== action.payload
        //       );
        //     } else {
        //       state.user.following.push(action.payload);
        //     }
        //     console.log("after update:", state.user.following);

        //   },
    }
});

export const {getUser, getOtherUsers, getMyProfile,followingUpdate} = userSlice.actions;
export default userSlice.reducer;