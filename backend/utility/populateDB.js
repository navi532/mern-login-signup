
// @desc Load when a user register itself
const populateDB = async (db,userid) => {    

    sql = `INSERT IGNORE INTO locations (user,deviceid,timestamp,location)
    VALUES
        (${userid},'D-1567',STR_TO_DATE('31-08-2022 10:05','%d-%m-%Y %H:%i'),'L1'),
        (${userid},'D-1567',STR_TO_DATE('31-08-2022 10:10','%d-%m-%Y %H:%i'),'L1'),
        (${userid},'D-1567',STR_TO_DATE('31-08-2022 10:15','%d-%m-%Y %H:%i'),'L1'),
        (${userid},'D-1567',STR_TO_DATE('31-08-2022 10:20','%d-%m-%Y %H:%i'),'L1'),
        (${userid},'D-1567',STR_TO_DATE('31-08-2022 10:25','%d-%m-%Y %H:%i'),'L2'),
        (${userid},'D-1568',STR_TO_DATE('31-08-2022 10:05','%d-%m-%Y %H:%i'),'L3'),
        (${userid},'D-1568',STR_TO_DATE('31-08-2022 10:10','%d-%m-%Y %H:%i'),'L3'),
        (${userid},'D-1568',STR_TO_DATE('31-08-2022 10:15','%d-%m-%Y %H:%i'),'L3'),
        (${userid},'D-1568',STR_TO_DATE('31-08-2022 10:20','%d-%m-%Y %H:%i'),'L3'),
        (${userid},'D-1568',STR_TO_DATE('31-08-2022 10:25','%d-%m-%Y %H:%i'),'L3'),
        (${userid},'D-1569',STR_TO_DATE('31-08-2022 10:15','%d-%m-%Y %H:%i'),'L4'),
        (${userid},'D-1569',STR_TO_DATE('31-08-2022 10:20','%d-%m-%Y %H:%i'),'L4'),
        (${userid},'D-1569',STR_TO_DATE('31-08-2022 10:25','%d-%m-%Y %H:%i'),'L1'),
        (${userid},'D-1569',STR_TO_DATE('31-08-2022 10:30','%d-%m-%Y %H:%i'),'L1'),
        (${userid},'D-1569',STR_TO_DATE('31-08-2022 10:35','%d-%m-%Y %H:%i'),'L2'),
        (${userid},'D-1570',STR_TO_DATE('31-08-2022 10:35','%d-%m-%Y %H:%i'),'L5'),
        (${userid},'D-1571',STR_TO_DATE('31-08-2022 10:35','%d-%m-%Y %H:%i'),'L6');
    `
    res = await db.promise().query(sql);
    
    console.log(`SAMPLE DATA POPULATED for userId ${userid}`.green.bold);
    
}

module.exports = populateDB;