const express = require("express");
const router = express.Router();
const User = require("../models/User.model")


// GET /user/profile//  user by Id

router.get("/profile/:id", (req, res, next) => {
    const userId = req.payload._id;
    
    User.findById(userId)
    .select("-password")
    .then(user => {
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const { email, name, role, profile_pic, location, bio } = user;
        res.status(200).json({user: {email, name, role, profile_pic, location, bio }});
    })
    .catch(err => res.status(500).json({ message: "Error retrieving user profile", error: err}));
    
});

// GET /api/users/sitters - Retrieve all sitters
router.get("/sitters", async (req, res) => {
    try {
      const sitters = await User.find({ role: "sitter" }).select(
        "name email location bio profile_pic"
      );
  
      if (!sitters.length) {
        return res.status(404).json({ message: "No sitters available." });
      }
  
      res.status(200).json({ data: sitters });
    } catch (error) {
      console.error("Error fetching sitters:", error);
      res.status(500).json({ error: "Failed to fetch sitters" });
    }
  });

module.exports = router;