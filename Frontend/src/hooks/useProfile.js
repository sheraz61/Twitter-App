import axios from "axios"
import { USER_API_ENDPOINT } from '../Utils/constant.js'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getProfile } from "../Redux/userSlice.js"
const useProfile =  (userId) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/profile/${userId}`,{
                    withCredentials: true,
                })
                dispatch(getProfile(res?.data?.user))
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile()
    },[userId])
}
export default useProfile