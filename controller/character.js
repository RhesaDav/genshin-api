const Character = require('../models/character');

class characterController {
    static createCharacter = async (req, res) => {
        const character = new Character({
            name: req.body.name,
            description: req.body.description,
            vision: req.body.vision,
        });

        character.save((err, character) => {
            if (err) {
                res.status(500).send({
                    message: "Failed to create character",
                });
            } else {
                res.status(201).send({
                    message: "Character created",
                    data: character,
                });
            }
        });
    }

    static listCharacter = async (req, res) => {
        Character.find()
            .then((data) => {
                if (data.length === 0) {
                    res.status(404).json({
                        message: "No character found",
                    });
                } else {
                    res.status(200).json({
                        message: `Character List : ${data.length}`,
                        data: data,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "No character found",
                });
            });
    }

    static deleteCharacter = async (req, res) => {
        Character.findByIdAndDelete(req.params.id)
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        message: "Character deleted",
                    });
                } else {
                    res.status(404).json({
                        message: "No character found",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "No character found",
                });
            });
    }

    static characterDetail  = async (req, res) => {
        Character.findById(req.params.id)
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        message: "Character Details",
                        data: data,
                    });
                } else {
                    res.status(404).json({
                        message: "No character found",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Failed to get character",
                });
            });
    }
}

module.exports = characterController;