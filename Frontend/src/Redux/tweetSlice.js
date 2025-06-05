import {createSlice} from '@reduxjs/toolkit'
const tweetSlice=createSlice({
    name:'tweet',
    initialState:{
        tweets:null,
        refresh:false,
        isActive:true,
        isBookmark:false
    },
    reducers:{
        //mulitple actionns
        getTweets:(state,action)=>{
            state.tweets=action.payload
        },
        getRefresh:(state)=>{
            state.refresh=!state.refresh
        },
        getIsActive:(state,action)=>{
            state.isActive=action.payload
        },
        getIsBookmark:(state,action)=>{
            state.isBookmark=action.payload
        }
    }
})
export const {getTweets,getRefresh,getIsActive,getIsBookmark}=tweetSlice.actions
export default tweetSlice.reducer
