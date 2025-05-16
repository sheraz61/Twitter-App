import User from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tweet from '../Models/Tweet.model.js'
export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(401).json({
                message: "User already exists",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({ name, username, email, password: hashedPassword });
        const updateUser = await User.findById(createdUser._id).select("-password");
        
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: updateUser
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }
        //validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            });
        }
        //create a token
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: "Login successful",
            success: true,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", "", { expiresIn: new Date(Date.now()) });
        return res.status(200).json({
            message: "Logout successful",
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const Bookmark = async (req, res) => {
    try {
        const userId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const tweet = await Tweet.findById(tweetId); // Assuming Tweet is a model for tweets
        if (!tweet) {
            return res.status(404).json({
                message: "Tweet not found",
                success: false
            });
        }
        if (user.bookmarks.includes(tweetId)) {
            await User.findByIdAndUpdate(userId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "Tweet removed from bookmarks",
                success: true
            })
        } else {
            await User.findByIdAndUpdate(userId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "Tweet added to bookmarks",
                success: true
            })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const Retweet = async (req, res) => {
    try {
        const userId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(userId)
        if (!user) return res.status(400).json({
            message: "User not found",
            success: false
        })
        const tweet = await Tweet.findById(tweetId); // Assuming Tweet is a model for tweets
        if (!tweet) {
            return res.status(404).json({
                message: "Tweet not found",
                success: false
            });
        }

        if (user.retweets.includes(tweetId)) {
            await User.findByIdAndUpdate(userId, { $pull: { retweets: tweetId } });
            return res.status(200).json({
                message: "Tweet unretweeted successfully",
                success: true
            });
        } else {
            await User.findByIdAndUpdate(userId, { $push: { retweets: tweetId } });
            return res.status(200).json({
                message: "Tweet retweeted successfully",
                success: true
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getMyProflie = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "User found successfully",
            user,
            success: true,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const userId = req.params.id;
        const otherUsers = await User.find({ _id: { $ne: userId } }).select("-password");
        if (!otherUsers) {
            return res.status(404).json({
                message: "No other users found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Other users found successfully",
            success: true,
            otherUsers
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const followAndUnfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser=await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        if (!loggedInUser || !user) {
            return res.status(404).json({
                message:`Users not found`,
                success: false
            });
        }
        if(loggedInUser.following.includes(userId)){
            await user.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userId}});
        }else{
            await user.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$push:{following:userId}});
        };
        return res.status(200).json({
            message: loggedInUser.following.includes(userId) ?  `${loggedInUser.name} Unfollowed successfully ${user.name}` : `${loggedInUser.name} Followed successfully ${user.name}`,
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
