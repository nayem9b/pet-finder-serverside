const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = process.env.PORT || 5000;
// MiddleWare
app.use(cors());
app.use(express.json());

// End Points Here
app.post("/post", async (req, res) => {
  try {
    const { post } = req.body;
    console.log(req.body);
    const newPost = await pool.query(
      "INSERT INTO finder (description) VALUES($1) RETURNING *",
      [post]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM finder");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update the post
app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const { description } = req.body;
    console.log(id, description);
    const updatePost = await pool.query(
      "UPDATE finder SET description = $1 WHERE finder_id = $2",
      [description, id]
    );

    res.json("Post is updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete the post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletePost = await pool.query(
      "DELETE FROM finder WHERE finder_id = $1",
      [id]
    );
    res.json("Post has been deleted!");
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/", async (req, res) => {
  res.send("My app is running on homepage");
});

app.listen(port, () => {
  console.log("Server is working");
});
