const db = require("../models");

function listPayment(db) {
  return async function (req, res) {
    let Payments = await db.Payment.findAll({
      where: {},
      include: [{ model: db.Patient }],
      include: [{ model: db.Visit }],
    });

    return res.json(Payments);
  };
}

function addPayment(db) {
  return async function (req, res) {
    try {
      let errors = [];
      if (!req.body.patientId) errors.push("no patient Id");
      if (!req.body.visitId) errors.push("no Visit Id");

      if (errors.length > 0)
        return res
          .status(400)
          .json({ status: "failed", error: errors.join(", ") });
              


      let patientId = parseInt(req.body.patientId);
      let visitId = parseInt(req.body.visitId);
      let montant = parseFloat(req.body.montant);

          // get visit with payments list 
          // if not excet add new payment with rest = prix[visit] - montant   
      // let rest = montant - 
      let newPayment = {
        patientId: patientId,
        visitId: visitId,
        montant: montant,
   
      };

      let payment = await db.Payment.create(newPayment);

      return res.status(201).json({ status: "success", payload: payment });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}
module.exports = { listPayment, addPayment };
