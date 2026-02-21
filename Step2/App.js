const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* MULTER CONFIG */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/* HOME - FORM */
app.get("/", (req, res) => {
  res.render("index");
});

/* SALVATAGGIO POST */
app.post("/addPost", upload.single("image"), (req, res) => {
  const { title, description } = req.body;

  const newPost = {
    id: Date.now(),
    title,
    description,
    imagePath: "/uploads/" + req.file.filename,
  };

  const posts = JSON.parse(fs.readFileSync("posts.json"));
  posts.push(newPost);

  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));

  res.redirect("/gallery");
});

/* GALLERY */
app.get("/gallery", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("posts.json"));
  res.render("gallery", { posts });
});

/* SINGOLO POST */
app.get("/post/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("posts.json"));
  const post = posts.find(p => p.id == req.params.id);

  res.render("post", { post });
});

app.listen(3000, () => console.log("Server avviato su http://localhost:3000"));