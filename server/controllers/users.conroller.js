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
      let token = generateAccessToken({ email: user.email });
      return res.json({ status: "success", token: token , userid :user.id});
    } else {
      return res
        .status(404)
        .json({ status: "failed", error: "user not found" });
    }
  };
}
function getUser(db) {
  return async function (req, res) {

    let user = await db.User.findAll({
      where: {},
    });
    if (user) {
      
      return res.json({ status: "success", payload: user });
    } else {
      return res
        .status(404)
        .json({ status: "failed", error: "user not found" });
    }
  };
}
  

module.exports = {login , getUser}