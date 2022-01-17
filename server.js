import express from "express";
import sql from "./database.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import CryptoJS from "crypto-js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;
const app = express();
app.use(cors("*"));
app.use(express.json());
app.use((req, res, next) => {
  const { url, method } = req;
  if (url.match("/api")) {
    console.log(
      `[ METHOD: ${method}  ROUTE: ${url} at ${new Date().toLocaleString()} ]`
    );
  }
  next();
});
app.post("/api/add", (req, res) => {
  const data = req.body;
  // Encrypt
  try {
    var ciphertext = CryptoJS.AES.encrypt(data.password, "secret").toString();
    sql.query(
      `INSERT INTO password_table (application, username, password, description) VALUES ('${data.application}', '${data.username}', '${ciphertext}', '${data.description}');`,
      (err, result) => {
        if (err) {
          res.send({
            status: 0,
            message: "issue while creating Data!!",
            error: err,
          });
        } else {
          res.send({ status: 1, message: "Data created Successfully!!" });
        }
      }
    );
  } catch (error) {
    res.send({
      status: 0,
      message: "issue while creating Data!!",
      error: error,
    });
  }
});

app.get("/api/getData", (req, res) => {
  try {
    sql.query(`select * from password_table;`, (err, result) => {
      if (err) {
        res.send({
          status: 0,
          message: "issue while creating Data!!",
          error: err,
        });
      } else {
        const data = JSON.parse(JSON.stringify(result));
        const data1 = data.map((val) => {
          // Decrypt
          var bytes = CryptoJS.AES.decrypt(val.password, "secret");
          var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          return { ...val, password: decryptedPassword };
        });
        res.send({ data: data1 });
      }
    });
  } catch (error) {
    res.send({
      status: 0,
      message: "issue while creating Data!!",
      error: err,
    });
  }
});
app.use(express.static(path.join(__dirname, "./frontend/dist/frontend")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist/frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[http://localhost:${PORT}]`);
  console.log([{ status: `Server started at ${new Date().toLocaleString()}` }]);
});
