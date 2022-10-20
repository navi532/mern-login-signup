const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');

const {loginUser,registerUser,meUser} = require('../controllers/userController');


router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/me").get(protect,meUser);

module.exports = router;