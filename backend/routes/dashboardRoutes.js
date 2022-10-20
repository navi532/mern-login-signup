const express = require('express');
const router = express.Router();
const {dashboardList} = require('../controllers/dashboardController');
const {protect} = require('../middlewares/authMiddleware');

router.route('/').get(protect,dashboardList);


module.exports = router;