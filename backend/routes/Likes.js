const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  //const { UserId } = req.user.id for web and validate token;
  const UserId = req.user.id;
  console.log(UserId);
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.json({ liked: false });
  }
});

module.exports = router;
