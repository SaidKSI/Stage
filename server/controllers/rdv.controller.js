const db = require("../models");
 


function addRdv(db){

    return async function (req,res) {
        try{ 
        let errors=[];
        if(!req.body.motif) errors.push("no motif")
        if(!req.body.patientId) errors.push("no patient Id")
        if(!req.body.date) errors.push("no date")

        if(errors.length>0)
        return res.status(400).json({status:"failed",error: errors.join(", ")})

        let patientId=parseInt(req.body.patientId)

        let date=new Date(req.body.date);
 
        let newRdv={
            motif:req.body.motif,
            
            daterdv: date,
            patientId:patientId
        }
      
        let rdv= await db.Rdv.create(newRdv)


        return res.status(201).json({status:"success",payload: rdv});

    }
    catch(err){
      return res.status(500).json({ status: "failed", payload: err });
    }
    }
    
} 


// function listRdv(db){

   
//     return async function (req,res) {

//         let rdvs= await db.Rdv.findAll(
//             {
//                 where:{},
//             include:[
//                 { model: db.Patient }
//             ],
//             order:[ ['id', 'DESC']]
//            }
//         );

//         return res.json(rdvs) 
//     }
// }
function listRdvs(db){

   
    return async function (req,res) {

        let rdvs= await db.Rdv.findAndCountAll(
            {
                where:{},
                include: [{ model: db.Patient }],
                order: [["daterdv", "DESC"]],
           }
        );

        return res.json(rdvs) 
    }
}


function deleteRdv(db) {
    return async function (req, res) {
      try {
        let id = parseInt(req.params.id);
        await db.Rdv.destroy({
          where: { id:id },
        });
        return res.json({status : 200,payload :"rdv deleted"});
      } catch (err) {
        return res.status(500).json({ status: "failed", payload: err });
      }
    };
  }
module.exports={addRdv,listRdvs ,deleteRdv}
