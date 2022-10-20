const asyncHandler = require('express-async-handler');

// @desc get list of all devices
// @route GET /api/dashboard/
// @access Private
const dashboardList = asyncHandler(async (req,res) => {
    const db = req.app.get('db');
    let locationlist = [];
    try{
        const sql = `SELECT devices.deviceid deviceid,devices.devicetype devicetype,locations.timestamp timestamp,locations.location location from devices INNER JOIN locations on devices.deviceid=locations.deviceid where locations.user = '${req.user.id}'`;
        [locationlist] = await db.promise().query(sql);
    }
    catch(err){
        res.status(401);
        throw err;
    }

    locationlist.sort((a,b) => {
        if(a.deviceid == b.deviceid){
            return a.timestamp - b.timestamp;
        }
        return a.deviceid > b.deviceid ? 1 : -1;
    });
    locationlist = [...new Map(locationlist.map(item =>
        [item['deviceid'], item])).values()]

    res.status(200).json({message:"User Data",data:locationlist});
});

module.exports = {dashboardList};