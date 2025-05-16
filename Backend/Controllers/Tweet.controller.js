import Tweet from "../Models/Tweet.model.js";
import User from "../Models/User.model.js";
export const createTweet=async(req,res)=>{
    try {
        const {description,id}=req.body;
        if(!description || !id) return res.status(400).json({
            message:"All fields are required",
            success:false
        });
        const user=await User.findById(id).select("-password");
        if(!user) return res.status(400).json({
            message:"User not found",
            success:false
        })
      const tweet= await Tweet.create({
        description,
        userId:id,
        userDetails:user
       })
       if(!tweet) return res.status(400).json({
        message:"Tweet creation failed",
        success:false
       })
       res.status(201).json({
        message:"Tweet created successfully",
        success:true
       })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

export const deleteTweet=async(req,res)=>{
    try {
        const {id}=req.params;
        const tweet=await Tweet.findByIdAndDelete(id);
        if(!tweet) return res.status(400).json({
            message:"Tweet not found",
            success:false
        })
        res.status(200).json({
            message:"Tweet deleted successfully",
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

export const likeOrDislike = async(req,res)=>{
    try {
        const loggedInUser=req.body.id;
        const tweetId=req.params.id;
        const tweet=await Tweet.findById(tweetId);
        const user=await User.findById(loggedInUser);
        if(!user) return res.status(400).json({
            message:"User not found",
            success:false
        })

        if(!tweet) return res.status(400).json({
            message:"Tweet not found",
            success:false
        })
        const isLiked=tweet.like.includes(loggedInUser);
        if(isLiked){
            await Tweet.findByIdAndUpdate(tweetId,{
                $pull:{
                    like:loggedInUser
                }
            })
            res.status(200).json({
                message:"Tweet disliked successfully",
                success:true
            })
        }else{
            await Tweet.findByIdAndUpdate(tweetId,{
                $push:{
                    like:loggedInUser
                }
            })
            res.status(200).json({
                message:"Tweet liked successfully",
                success:true
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}


export const getAllTweets=async(req,res)=>{
    try {
        const id=req.params.id;
        const user=await User.findById(id);
        if(!user) return res.status(400).json({
            message:"User not found",
            success:false
        })
        const tweets=await Tweet.find({userId:id}).select("-userDetails");
        const followingUserTweets=await Tweet.find({userId:{$in:user.following}}).select("-userDetails");
        if(!tweets) return res.status(400).json({
            message:"No tweets found",
            success:false
        })
        res.status(200).json({
            message:"All tweets fetched successfully",
            tweets:tweets.concat(...followingUserTweets),
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

export const getFollowingTweets=async(req,res)=>{
    try {
        const id=req.params.id;
        const user=await User.findById(id);
        if(!user) return res.status(400).json({
            message:"User not found",
            success:false
        })
        const followingUserTweets=await Tweet.find({userId:{$in:user.following}}).select("-userDetails");
        if(!followingUserTweets) return res.status(400).json({
            message:"No tweets found",
            success:false
        })
        res.status(200).json({
            message:"Following tweets fetched successfully",
            tweets:[].concat(...followingUserTweets),
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

