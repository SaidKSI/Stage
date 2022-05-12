const db = require("../models");



function listPatients(db) {
    return async function (req, res) {
        let docteurId =parseInt(req.params.id);
        
      let patients = await db.Patient.findAndCountAll({
        where: {docteurId : docteurId},
        // include: [{ model: db.Rdv }],
        order: [["id", "DESC"]],
      });
  
      return res.json(patients);
    };
  }