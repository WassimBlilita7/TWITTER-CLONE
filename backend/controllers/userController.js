import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

export const getUserProfile = async (req,res)=>{
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select("-password");
        if(!user){
            return res.status(400).json({message : "User not found"}); 
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error : error.message});
        console.log('Error in get user profile');
    }

}

export const followUnfollowUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()){return res.status(400).json({error : "You can't follow yourself"})};

        if(!userToModify || !currentUser){return res.status(400).json({error : "User not found"})};

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // désabonner user
            await User.findByIdAndUpdate(id,{$pull:{followers : req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$pull:{following : id}});

            res.status(200).json({message : "User unfollowed successfully"});

        }else{
            //abonnée user
            await User.findByIdAndUpdate(id,{$push:{followers : req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$push:{following : id}});

            res.status(200).json({message : "User followed successfully"});

            // envoyer notification
            const newNotification = new Notification({
                type : 'follow',
                from : req.user._id,
                to : userToModify._id
            });
            await newNotification.save();

        }


    } catch (error) {
        res.status(500).json({error : error.message});
    }
}