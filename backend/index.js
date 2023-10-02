import express from "express";
import mysql from "mysql";
import { v4 } from "uuid";
import cors from "cors";

const PORT = 3300;
const app = express();

// Création du database de connexion
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "monpassword",
  database: "creperie",
});

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'monpassword'

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is backend server");
});

app.get("/api/menus", (req, res) => {
  const q = "SELECT * FROM menuItems ORDER BY name ASC";
  database.query(q, (error, data) => {
    if (error) res.json(error);
    return res.json(data);
  });
});

app.post("/api/menus", (req, res) => {
  const type = req.body.type;
  const name = req.body.name;
  const price = req.body.price;
  const id = v4();

  const q = "INSERT INTO menuItems (id, type, name, price) VALUES (?, ?, ?, ?)";
  const values = [id, type, name, price];

  database.query(q, values, (error, data) => {
    if (error) res.json(error);
    return res.json("Element créé avec succès");
  });
});

app.delete("/api/menus/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM menuItems WHERE id = ?";
  database.query(q, id, (error, data) => {
    if (error) res.json(error);
    return res.json("Element supprimé avec succès");
  });
});

app.put("/api/modif/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  console.log(id);
  const q = "UPDATE menuItems SET type= ?, name= ?, price= ? WHERE id = ?";

  const values = [req.body.type, req.body.name, req.body.price, id];

  database.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`CONNECT TO BACKEND SERVER http://localhost:${PORT}`);
});
