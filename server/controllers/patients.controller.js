const db = require("../models");

function listPatients(db) {
  return async function (req, res) {
    let patients = await db.Patient.findAndCountAll({
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
      console.log(err);
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
      parseInt();

      dateN = new Date(req.body.dataN);

      let newPatient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cin: req.body.cin,
        dateN: dateN,
        email: req.body.email,
        gender: req.body.gender,
      };

      await db.Patient.create(newPatient);
      //res.send("create a patient");
      return res.status(201).json("create a patient");
    } catch (err) {
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}

function updatePatient(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);
      dateN = new Date(req.body.dataN);
     
        await db.Patient.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cin: req.body.cin,
            dateN: dateN,
            email: req.body.email,
            gender: req.body.gender
          },
          {
            where: { id: id }
          }
        );
     
        return res.status(201).json("patient has been updated");
    } catch (err) {
      console.log(err);
      return res.status(204).json({ status: "failed", payload: err });
    }
  };
}

function deletePatient(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);
      await db.Patient.destroy({
        where: { id: id },
      });
      return res.json({ satatus: 200, payload: "patient deleted" });
    } catch (err) {
      return res.status(500).json({ status: "failed", payload: err });
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
      console.log(err);
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}

function countPatient() {
  return async function (req, res) {
    let count = await db.Patient.findAndCountAll({
      where: {},
    });
    return res.status(200).json({ payload: count });
  };
}

module.exports = {
  detailsPatient,
  listPatients,
  updatePatient,
  addPatient,
  deletePatient,
  searchPatient,
  countPatient,
};
