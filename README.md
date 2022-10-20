# mern-pensieve-task

Run MySQL database
Use valid credentials to connect to db.

```bash
sudo mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
mysql> flush privileges;
mysql> exit 
```
change password to 'yourpassword' in backend/config/db.js
