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

    return res.json(Visits);
  };
}

module.exports = { addVisit, listVisit };
