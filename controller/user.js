const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  static userList = async (req, res) => {
    User.find()
      .then((data) => {
        if (data.length === 0) {
          res.status(404).json({
            message: "No user found",
          });
        } else {
          res.status(200).json({
            message: `User List : ${data.length}`,
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "No user found",
        });
      });
  };

  static userCreate = async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 6),
      role: req.body.role,
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({
          message: "Failed to create user",
        });
      } else {
        res.status(201).send({
          message: "User created",
          data: user,
        });
      }
    });
  };

  static userDetail = async (req, res) => {
    User.findById(req.params.id)
      .then((data) => {
        if (data) {
          res.status(200).json({
            message: "User Details",
            data: data,
          });
        } else {
          res.status(404).json({
            message: "No user found",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Failed to get user",
        });
      });
  };

  static userUpdate = async (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(200).json({
          message: "User Updated",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Failed to update user",
        });
      });
  };

  static userDelete = async (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
      .then((data) => {
        res.status(200).json({
          message: "Success Deleted User",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Failed to delete user",
        });
      });
  };

  static userLogin = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({
          message: "User Not Found",
        });
      }
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            email: user.email,
            password: user.password,
            role: user.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        return res.status(200).json({
          message: `Login Success. Hi ${user.name}`,
          token: token,
        });
      } else {
        res.status(400).send({
          message: "password is wrong",
        });
      }
    } catch (err) {
      next(err);
    }
    // User.findOne({ email: req.body.email }).exec((err, user) => {
    //   if (err) {
    //     res.status(500).send({
    //       message: "Failed to login user",
    //     });
    //     console.log(err);
    //     return;
    //   } else if (!user) {
    //     return res.status(404).send({
    //       message: "No user found",
    //     });
    //   }

    //   const passwordIsValid = bcrypt.compareSync(
    //     req.body.password,
    //     user.password
    //   );

    //   if (!passwordIsValid) {
    //     return res.status(401).send({
    //       accessToken: null,
    //       message: "Invalid Password",
    //     });
    //   }

    //   const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: 86400,
    //   });

    //   res.status(200).send({
    //     message: "Success Login",
    //     accessToken: token,
    //     user: {
    //       id: user._id,
    //       name: user.name,
    //       email: user.email,
    //     },
    //   });
    // });
  };
}

module.exports = userController;
