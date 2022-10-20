
# Pensieve Task
A Web application where user can login and register itself. Once logged in
he can see unique geolocations stored in RDBMS sort by recent timestamps.





## Installation

Download the project from [here](https://drive.google.com/drive/u/1/folders/1wVZm1lEtVth-9Zm25QRe8iwc45FYb5bx)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV = development`   
`PORT = 8000`  
`JWT_SECRET = ^^__yourjwtsecret__^^`


## Run Locally
1. Make sure `mysql` database is installed in your system and is running.  [Installation Guide for MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

2. Change password to 'yourpassword' in `${projectdir}/backend/config/db.js`

3. Go to the project directory

4. Open 2 terminals in your current directory.   
`Terminal1 - Backend server`  
`Terminal2 - Frontend server`  

5. **Install dependencies**

Terminal 1
```bash
  ${projectdir}> cd backend
  ${projectdir}/backend> npm install
```

Terminal 2
```
  ${projectdir}> cd frontend
  ${projectdir}/frontend> npm install
```

6. **Start the server**

Terminal 1 (Make sure you present at backend/)
```bash
  ${projectdir}/backend> npm run server
```

Terminal 2 ((Make sure you present at frontend/))
```
  ${projectdir}/frontend> npm start
```

## Demo
[Link to demo](https://drive.google.com/file/d/1mYlfHFBkrXQxKO-cO653lP3hSeormse9/view?usp=sharing)


## FAQ

#### Question: If MySQL is freshly installed or using sql_native_password, then how to connect?
Answer: Open mysql console, and do following:
```bash
sudo mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
mysql> flush privileges;
mysql> exit 
```
