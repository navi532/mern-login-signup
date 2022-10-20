const mysql = require("mysql2");
const asyncHandler = require("express-async-handler");

const getDB = async () => {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aeman&09",
  });

  conn.connect((err) => {
    if (err) {
      console.error("Failed to connect!".red.bold);
      throw err;
    }

    console.log("MySQL connected".green.bold);
  });

  //Initialise Database
  try {
    let sql = "CREATE DATABASE IF NOT EXISTS pensieve;";
    const res = await conn.promise().query(sql);
    console.log("DB pensieve ".bold + "created");
  } catch (err) {
    console.error("Fail to create a Database".red);
    throw err;
  }

  //Use DB
  try {
    sql = "USE pensieve;";
    const res = await conn.promise().query(sql);
    console.log("Connected to db pensieve".green.bold);
  } catch (err) {
    console.error("Failed to  connect to DB pensieve".red);
    throw err;
  }

  //Users Table
  try {
    sql = `CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT,
            fullname VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT UC_email UNIQUE(email),
            CONSTRAINT PK_id PRIMARY KEY(id)
        );`;
    const res = await conn.promise().query(sql);
    console.log("Table USERS ".bold + "created");
  } catch (err) {
    console.error("Failed to create a table USERS".red);
    throw err;
  }

  //Devices Table
  try {
    sql = `CREATE TABLE IF NOT EXISTS devices(
            deviceid VARCHAR(45) ,
            devicetype VARCHAR(45) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT PK_deviceid PRIMARY KEY(deviceid)
        );`;
    const res = await conn.promise().query(sql);
    console.log("Table DEVICES ".bold + "created");
  } catch (err) {
    console.error("Failed to create a table DEVICES".red);
    throw err;
  }
  try {
    let sql = `INSERT IGNORE INTO devices(deviceid,devicetype)
        VALUES
            ('D-1567','Aircraft'),
            ('D-1568','Personal'),
            ('D-1569','Asset'),
            ('D-1570','Personal'),
            ('D-1571','Asset');`;
    let res = await conn.promise().query(sql);
    console.log("Sample DEVICES " + "added!");
  } catch (err) {
    console.error("Failed to insert Sample Devices".red);
    throw err;
  }

  //locations Table
  try {
    sql = `CREATE TABLE IF NOT EXISTS locations(
            user int NOT NULL,
            deviceid VARCHAR(45) NOT NULL,
            timestamp TIMESTAMP NOT NULL,
            location VARCHAR(10) NOT NULL,
            CONSTRAINT UC_user_deviceid_timestamp UNIQUE(user,deviceid,timestamp),
            CONSTRAINT FK_user FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE,
            CONSTRAINT FK_deviceid FOREIGN KEY(deviceid) REFERENCES devices(deviceid) ON DELETE CASCADE
        );`;
    const res = await conn.promise().query(sql);
    console.log("Table LOCATIONS ".bold + "created");
  } catch (err) {
    console.error("Failed to create a table LOCATIONS".red);
    throw err;
  }
  conn.config.database = "pensieve";
  return conn;
};

module.exports = { getDB };
