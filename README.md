
# Pensieve Task
A Web application where user can login and register itself. Once logged in
he can see unique geolocations stored in RDBMS sort by recent timestamps.





## Installation

Download the project from [here](https://google.com)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV = development`   
`PORT = 8000`  
`JWT_SECRET = ^^__yourjwtsecret__^^`


## Run Locally

Go to the project directory

Open 2 terminals in current directory.   
`Terminal1 - Backend server`  
`Terminal2 - Frontend server`  

### 1.Install dependencies  

Terminal 1
```bash
  cd backend
  npm install
```

Terminal 2
```
  cd frontend
  npm install
```

### 2.Start the server

Terminal 1 (Make sure you present at backend/)
```bash
  npm run server
```

Terminal 2 ((Make sure you present at frontend/))
```
  npm start
```

## Screenshots

![Login Screenshot](images/s1.jpg)  
![Signup Screenshot](images/s2.jpg)
![Dashboard Screenshot](images/s3.jpg)



## Demo

Insert gif or link to demo

Run MySQL database
Use valid credentials to connect to db.

```bash
sudo mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
mysql> flush privileges;
mysql> exit 
```
change password to 'yourpassword' in backend/config/db.js
