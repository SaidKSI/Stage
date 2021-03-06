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
      //req.userId , see auth middleware
      let userId = parseInt(req.userId);
  

      let newVisit = {
        motif: req.body.motif,
        datevisit: new Date(req.body.datevisit),
        userId: userId,
        interrogatoire: req.body.interrogatoire,
        conclusion: req.body.conclusion,
        prix: prix,
        patientId: patientId,
      };

      let visit = await db.Visit.create(newVisit);

      return res.status(201).json({ status: "success", payload: visit });
    } catch (err) {
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}

function listVisit(db) {
  return async function (req, res) {
    let Visits = await db.Visit.findAndCountAll({
      where: {},
      include: [
        { model: db.Patient },
        {
          model: db.User,
        }
      ],
      
    });
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
      return res.status(500).json({ status: "failed", payload: err });
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
          {
            model: db.Payment,
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

function deleteVisit(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);
      await db.Visit.destroy({
        where: { id: id },
      });
      return res.json({ status: 200, payload: "Visit deleted" });
    } catch (err) {
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}
module.exports = { detailsVisit, addVisit, listVisit, deleteVisit };
