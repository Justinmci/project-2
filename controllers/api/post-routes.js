const router = require("express").Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, Likes } = require("../../models");
const withAuth = require('../../utils/auth');



// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "summary", "user_id", "created_at", [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes_count']],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "summary", "user_id", "created_at", [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes_count']],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No story found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a post
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title, 
    content: req.body.content, 
    summary: req.body.summary,
    user_id: req.body.user_id
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Like a post
router.put('/like', withAuth, (req, res) => {
  Post.like({ ...req.body, user_id: req.session.user_id }, { Likes, Comment, User })
  .then(updatedLikesData => res.json(updatedLikesData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update a post
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title, 
      content: req.body.content, 
      summary: req.body.summary
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No story found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Delete a post 
//REMEMBER to DOUBLE check with user if they want to delete, this is final
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No story found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;