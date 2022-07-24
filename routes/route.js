const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const characterRouter = require("./characterRouter");

router.use("/user", userRouter);
router.use("/character", characterRouter);

module.exports = router;