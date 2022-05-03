const db = require("../models");
const { generateAccessToken } = require("../middleware/utils");
//User Loging
function login(db) {
  return async function (req, res) {
    let errors = [];
    if (!req.body.email) errors.push("Enter Ur Email");
    if (!req.body.password) errors.push("Enter Ur Password");
    if (errors.length > 0)
      return res
        .status(400)
        .json({ status: "failed", error: errors.join(", ") });

    let email = req.body.email;
    let password = req.body.password;
    let user = await db.User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (user) {
      let token = generateAccessToken({ email: user.email, role: user.role });
      return res.json({
        status: "success",
        token: token,
        userid: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      return res
        .status(404)
        .json({ status: "failed", error: "user not found" });
    }
  };
}
function getUser(db) {
  return async function (req, res) {
    let user = await db.User.findAndCountAll({
      where: {},
    });

    return res.json(user );
  };
}



function addUser(db) {
  return async function (req, res) {
    try {
      let errors = [];
      if (!req.body.firstName) errors.push("no first name");
      if (!req.body.lastName) errors.push("no last name");
      if (!req.body.role) errors.push("no role");
      if (!req.body.password) errors.push("no password");
      if (!req.body.email) errors.push("no email");

      if (errors.length > 0)
        return res
          .status(400)
          .json({ status: "failed", error: errors.join(", ") });

      let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        password: req.body.password,
        email: req.body.email,
      };

      let user = await db.User.create(newUser);
      res.send("create a User");
      return res.status(201).json({ status: "success", payload: user });
    } catch (err) {
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}


function deleteUser(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);
      await db.User.destroy({
        where: { id:id },
      });
      return res.json({status : 200,payload :"user deleted"});
    } catch (err) {
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}
module.exports = { login, getUser, addUser,deleteUser };
