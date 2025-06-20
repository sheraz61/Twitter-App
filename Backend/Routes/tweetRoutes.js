import express from "express";
import { createTweet ,deleteTweet,getAllTweets,getBookmarkTweets,getFollowingTweets,getMyTweets,likeOrDislike} from "../Controllers/Tweet.controller.js";
import isAuthenticated from "../Config/auth.js";

const router=express.Router();
router.post("/create",isAuthenticated,createTweet);
router.delete("/delete/:id",isAuthenticated,deleteTweet);
router.patch("/like/:id",isAuthenticated,likeOrDislike);
router.get('/all/:id',isAuthenticated,getAllTweets)
router.get('/bookmark/:id',isAuthenticated,getBookmarkTweets)
router.get('/my/:id',isAuthenticated,getMyTweets)
router.get('/following/:id',isAuthenticated,getFollowingTweets)

export default router;
