import mysql from "mysql";

const dbInstance = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "password_manager",
});

dbInstance.query(`Select 1+1`, (error, res) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connection Established!!");
  }
});

export default dbInstance;
