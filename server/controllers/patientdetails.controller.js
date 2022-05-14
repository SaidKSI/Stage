const db = require("../models");



// function listPatients(db) {
//     return async function (req, res) {
//         let docteurId =parseInt(req.params.id);
//       let patients = await db.Patient.findAndCountAll({
//         where: {docteurId : docteurId},
//         // include: [{ model: db.Rdv }],
//         order: [["id", "DESC"]],
//       });
  
//       return res.json(patients);
//     };
//   }

function addPatientDetails(db) {
  return async function (req, res) {
    try {
      let errors = [];
      if (!req.body.weight) errors.push("no first name");
      if (!req.body.height) errors.push("no last name");
      

      if (errors.length > 0)
        return res
          .status(400)
          .json({ status: "failed", error: errors.join(", ") });
      parseInt();

      let patientId = parseInt(req.body.patientId)
      
      let newPatientDetails = {
        patientId : patientId,
        weight: req.body.weight,
        height: req.body.height,
        datemesure :req.body.datemesure
        
        
       
      };

      await db.PatientDetails.create(newPatientDetails);
      //res.send("create a patient");
      return res.status(201).json("create a patient details");
    } catch (err) {
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}

function patientDetails(db) {
  return async function (req, res) {
    try {
      let id = parseInt(req.params.id);

      let patientdetails = await db.PatientDetails.findOne({
        where: { id: id }
        
      });

      if (patientdetails) {
        return res.json({ status: "success", payload: patientdetails });
      } else
        return res.status(404).json({ status: "failed", payload: "not found" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: "failed", payload: err });
    }
  };
}


module.exports = {
  addPatientDetails,
  patientDetails
 
};
