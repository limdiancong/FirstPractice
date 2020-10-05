const express = require('express');
const router = express.Router();
const Post = require("../../models/Posts");

//get all
router.get('/', async (req, res) => {
    try {
        const Posts = await Post.find()
        res.json(Posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    // res.send("hello POST WORLDS");
});
//get one
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
});
//create one 
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body
    })
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// update 
router.patch("/:id", getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title
    }
    if (req.body.body != null) {
        res.post.body = req.body.body
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
});
//delete
router.delete("/:id", getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({ message: `deleted ${res.post.title}` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//get post by id 

async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: "post not found " })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.post = post
    next();
};

module.exports = router
