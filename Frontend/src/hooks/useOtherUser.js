import axios from "axios"
import { USER_API_ENDPOINT } from '../Utils/constant.js'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOtherUsers } from "../Redux/userSlice.js"
const useOtherUser =  (userId) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchOtherUser = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/otheruser/${userId}`,{
                    withCredentials: true,
                })
                dispatch(getOtherUsers(res?.data?.otherUsers))
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUser()
    },[])
}
export default useOtherUser