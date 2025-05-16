import express from "express";
import { Register, Login, Logout ,Bookmark, Retweet, getMyProflie, getOtherUsers, followAndUnfollow} from "../Controllers/User.controller.js";
import isAuthenticated from "../Config/auth.js";
const router=express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.patch("/bookmark/:id",isAuthenticated,Bookmark);
router.patch("/retweet/:id",isAuthenticated,Retweet);

router.get('/profile/:id',isAuthenticated,getMyProflie)
router.get('/otheruser/:id',isAuthenticated,getOtherUsers)
router.patch('/follow/:id',isAuthenticated,followAndUnfollow)
export default router; 
