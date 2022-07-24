const express = require("express");
const characterRouter = express.Router();
const characterController = require("../controller/character");

characterRouter.get("/", characterController.listCharacter);
characterRouter.post("/", characterController.createCharacter);
characterRouter.delete("/:id", characterController.deleteCharacter);
characterRouter.get("/:id", characterController.characterDetail);

module.exports = characterRouter;