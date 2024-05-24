const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts });
});

app.get('/post/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render('post', { post });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
