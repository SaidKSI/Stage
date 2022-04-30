const db = require("../models");

function addVisit(db) {
  return async function (req, res) {
    try {
      let errors = [];
      if (!req.body.motif) errors.push("no motif");
      if (!req.body.patientId) errors.push("no patient Id");
      if (!req.body.prix) errors.push("no prix");

      if (errors.length > 0)
        return res
          .status(400)
          .json({ status: "failed", error: errors.join(", ") });

      let patientId = parseInt(req.body.patientId);
      let prix = parseFloat(req.body.prix);

      let newVisit = {
        motif: req.body.motif,
        interrogatoire: req.body.interrogatoire,
        conclusion: req.body.conclusion,
        prix: prix,
        patientId: patientId,
      };

      let visit = await db.Visit.create(newVisit);

      return res.status(201).json({ status: "success", payload: visit });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}

function listVisit(db) {
  return async function (req, res) {
    let Visits = await db.Visit.findAll({
      where: {},
      include: [{ model: db.Patient }],
      order: [["id", "DESC"]],
    });
    // if(!["Docteur"].includes(req.role))
    // {
    //   return res.status(400).json({status : "failed" , error : "unauthorized"})
    // }
    return res.json(Visits);
  };
}

function deleteVisit(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);

      let deleted = await db.Visit.destroy({
        where: { id: id },
      });
      return res.json(deleted);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}

function detailsVisit(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);

      let visit = await db.Visit.findOne({
        where: { id: id },
        include: [
          {
            model: db.Patient,
          },
        ],
      });

      if (visit) {
        return res.json({ status: "success", payload: visit });
      } else
        return res.status(404).json({ status: "failed", payload: "not found" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}
module.exports = { detailsVisit, addVisit, listVisit, deleteVisit };
