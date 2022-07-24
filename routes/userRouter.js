const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user");
const authenticateJWT = require("../middleware/authJWT");

// userRouter.get("/", authenticateJWT.authentication, authenticateJWT.authAdmin ,userController.userList);
userRouter.get("/", userController.userList);
userRouter.post("/",  userController.userCreate);
userRouter.patch("/:id", userController.userUpdate);
userRouter.delete("/:id", authenticateJWT.authentication, authenticateJWT.authAdmin, userController.userDelete);
userRouter.get("/:id", userController.userDetail);
userRouter.post("/login", userController.userLogin);

module.exports = userRouter;