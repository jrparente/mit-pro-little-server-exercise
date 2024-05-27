const express = require("express");
const app = express();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
let port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(express.static("public"));

// Set some defaults
db.defaults({ posts: [], user: [] }).write();

// list posts
app.get("/data", (req, res) => {
  const posts = db.get("posts").value();
  res.send(posts);
});

// post route
app.post("/test", (req, res) => {
  console.log(req.body);
  res.send("Data received:" + " " + JSON.stringify(req.body));
});

// Add a route to add a post
app.post("/addPost", (req, res) => {
  const post = {
    id: req.body.id,
    title: req.body.title,
    published: req.body.published,
  };

  db.get("posts").push(post).write();
  console.log(db.get("posts").value());
  res.send(db.get("posts").value());
});

app.post("/addUser", (req, res) => {
  const user = {
    id: req.body.id,
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    streetaddress: req.body.streetaddress,
    citystatezip: req.body.citystatezip,
    avatar: req.body.avatar,
  };

  db.get("user").push(user).write();
  console.log(db.get("user").value());
  res.send(db.get("user").value());
});

app.get("/userData", (req, res) => {
  const user = db.get("user").value();
  res.send(user);
});

// Add a post
app.get("/posts/:title/:id/:published", (req, res) => {
  const post = {
    id: parseInt(req.params.id),
    title: req.params.title,
    published: req.params.published === "true" ? true : false,
  };

  db.get("posts").push(post).write();
  res.send(db.get("posts").value());
});

// delete all posts
app.get("/deleteAll", (req, res) => {
  db.get("posts").remove().write();
  res.send(db.get("posts").value());
});

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
