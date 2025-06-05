import axios from "axios"
import { TWEET_API_ENDPOINT } from '../Utils/constant.js'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTweets } from "../Redux/tweetSlice.js"
const useGetMyTweet = (id) => {
    const dispatch = useDispatch()
    const { refresh, isActive,isBookmark } = useSelector(store => store.tweet)
    const followingHandler = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/following/${id}`, {
                withCredentials: true,
            })
            if(res?.data?.success){
                dispatch(getTweets(res?.data?.tweets))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchGetTweet = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/all/${id}`, {
                withCredentials: true,
            })
            if (res?.data?.success) {
                dispatch(getTweets(res?.data?.tweets))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchBookmarkTweets= async()=>{
        try {
            const res= await axios.get(`${TWEET_API_ENDPOINT}/bookmark/${id}`, {
                withCredentials: true,
            })
            if(res?.data?.success){
                dispatch(getTweets(res?.data?.tweets))
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(isBookmark) {
            fetchBookmarkTweets()
        }else if(isActive) {
            fetchGetTweet()
        } else {
            followingHandler()
        }
    }, [refresh, isActive,isBookmark])
}
export default useGetMyTweet