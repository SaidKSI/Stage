const db = require("../models");

function listPatients(db) {
  return async function (req, res) {
    let patients = await db.Patient.findAll({
      where: {},
      include: [{ model: db.Rdv }],
      order: [["id", "DESC"]],
    });

    return res.json(patients);
  };
}



function detailsPatient(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);

      let patient = await db.Patient.findOne({
        where: { id: id },
        include: [{ model: db.Rdv }],
        order: [[db.Rdv, "daterdv", "DESC"]],
      });

      if (patient) {
        return res.json({ status: "success", payload: patient });
      } else
        return res.status(404).json({ status: "failed", payload: "not found" });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}



function addPatient(db) {
  return async function (req, res) {
    try {
      let errors = [];
      if (!req.body.firstName) errors.push("no first name");
      if (!req.body.lastName) errors.push("no last name");
      if (!req.body.cin) errors.push("cin");

      if (errors.length > 0)
        return res
          .status(400)
          .json({ status: "failed", error: errors.join(", ") });
          cin = parseInt(req.body.cin)
      let newPatient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cin: cin
      };

      let patient = await db.Patient.create(newPatient);
      res.send("create a patient");
      return res.status(201).json({ status: "success", payload: patient });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}



function updatePatient(db) {
  return function (req, res) {
    return response.json("");
  };
}



function deletePatient(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);
  //     let deleteVisits= await db.Visit.db ({
  //           where : {	patientId : id}
  //     });
  //     let deleteRdvs= await db.Rdv.db ({
  //       where : {	patientId : id}
  // });
      await db.Patient.destroy({
        where: { id: id },
      });
      return res.json("patient deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}

function searchPatient(db) {
  return async function (req, res) {
    try {
      let cin = parseInt(req.params.cin);

      let patient = await db.Patient.findOne({
        where: { cin: cin },
        include: [{ model: db.Rdv }],
        order: [[db.Rdv, "daterdv", "DESC"]],
      });

      if (patient) {
        return res.json({ status: "success", payload: patient });
      } else
        return res.status(404).json({ status: "failed", payload: "not found" });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}

module.exports = {
  detailsPatient,
  listPatients,
  updatePatient,
  addPatient,
  deletePatient,
  searchPatient
};
