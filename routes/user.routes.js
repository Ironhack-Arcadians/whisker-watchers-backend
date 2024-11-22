const express = require("express");
const router = express.Router();
const User = require("../models/User.model")


// GET /user/profile//  user by Id

router.get("/profile", (req, res, next) => {
    const userId = req.payload._id;
    
    User.findById(userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const { email, name, role, profile_pic, location, bio } = user;
        res.status(200).json({user: {email, name, role, profile_pic, location, bio }});
    })
    .catch(err => res.status(500).json({ message: "Error retrieving user profile", error: err}));
    
});

module.exports = router;