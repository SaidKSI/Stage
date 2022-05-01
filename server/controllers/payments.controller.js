const db = require("../models");

function listPayment(db) {
  return async function (req, res) {
    let Payments = await db.Payment.findAndCountAll({
      where: {},
      include: [
        {
          model: db.Patient,
        },
        {
          model: db.Visit,
        },
      ],
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
     
     
     
      // let Payments = await db.Payment.findOne({
      //   where: {id:visitId},
      //   include: [
      //     {
      //       model: db.Patient,
      //     },
      //     {
      //       model: db.Visit,
      //     }
          
      //   ],
      // });

      

          // get visit with payments list 
          // if not excet add new payment with rest = prix[visit] - montant   
      // let rest = montant - 
      let newPayment = {
        patientId: patientId,
        visitId: visitId,
        montant: montant
   
      };

      let payment = await db.Payment.create(newPayment);

      return res.status(201).json({ status: "success", payload: payment });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}






























// function addPayment(db) {
//   return async function (req, res) {
//     try {
//       let errors = [];
//       if (!req.body.patientId) errors.push("no patient Id");
//       if (!req.body.visitId) errors.push("no Visit Id");

//       if (errors.length > 0)
//         return res
//           .status(400)
//           .json({ status: "failed", error: errors.join(", ") });
              
//           let id = parseInt(req.params.id);
        
//       let patientId = parseInt(req.body.patientId);
//       let visitId = parseInt(req.body.visitId);
//       let montant = parseFloat(req.body.montant);
      
      
//       let Payments = await db.Payment.findOne({
//         where: {id:id},
//         include: [
//           {
//             model: db.Patient,
//           },
          
//         ],
//       });
//           // get visit with payments list 
//           // if not excet add new payment with rest = prix[visit] - montant   
//       // let rest = montant -
//       let newPayment = {
//         patientId: patientId,
//         visitId: visitId,
//         montant: montant,
        
//       };
 
//       if (!Payments) {
//         let payment = await db.Payment.create(newPayment);

//         return res.status(201).json({ status: "success", payload: "create a new payment" });
//       } else {
//         let payment = await db.Payment.update({newPayment}, 
//           {where:{id:id}
//         });
//         return res.status(201).json({ status: "success", payload: "update a payments" });
//       }

//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   };
// }
























// function addPayment(db) {
//   return async function (req, res) {
//     try {

//       let id = parseInt(req.params.id);
//       let montant = parseFloat(req.body.montant);
//       let prix = parseFloat(req.body.prix);


     
//       let visit = await db.Visit.update({
//         rest : prix  ,
//         montant : montant,
//         typePayment : req.body.typePayment
//       },{
//         where: { id: id },
//         include: [
//           {
//             model: db.Patient,
//           },
//         ],
//       });

      
        
//         return res.json({ status: "success", payload: visit });
     
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ status: "failed", payload: err });
//     }
//   };

// }

module.exports = { listPayment, addPayment };
