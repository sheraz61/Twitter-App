import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        otherUsers: null,
        profile: null,
    },
    reducers: {
        //mulitple actionns
        getUser: (state, action) => {
            state.user = action.payload
        },
        getOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        getProfile: (state, action) => {
            state.profile = action.payload
        },
        followingUpdate: (state, action) => {
            if (state.user.following.includes(action.payload)) {
                state.user.following = state.user.following.filter((itemId)=>{
                    return itemId !== action.payload;
                })
            } else {
                state.user.following.push(action.payload)
            }
        }
    }
})
export const { getUser, getOtherUsers, getProfile, followingUpdate } = userSlice.actions
export default userSlice.reducer
