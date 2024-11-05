const express = require("express");
const { allUsersProfile, updateUserProfile } = require("../controllers/user.controller"); // Make sure path is correct

const router = express.Router();

router.get("/all", allUsersProfile);
router.patch("/update/:id", updateUserProfile); 


module.exports = router;
