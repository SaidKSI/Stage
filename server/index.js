const express=require("express");
const cors=require("cors"); 
const path = require("path");
const {  } = require("./params/patients");
const { usersList } = require("./params/users");
const { generateAccessToken } = require("./middleware/utils");
const { authenticateToken, authenticateRole } = require("./middleware/auth");
  //nodemails
const nodemailer = require('nodemailer')
 

//database
const db = require("./models");

const { listPatients, addPatient, detailsPatient,deletePatient,searchPatient,countPatient, updatePatient } = require("./controllers/patients.controller");
const { addRdv,listRdvs,deleteRdv } = require("./controllers/rdv.controller");
const { login , getUser,addUser ,deleteUser} = require("./controllers/users.conroller");
const { addVisit , listVisit,deleteVisit,detailsVisit } = require("./controllers/visits.controller");
const { listPayment , addPayment,deletePayment } = require("./controllers/payments.controller");


 

//config express
const app=express();
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(cors({origin: "http://localhost:3000"}))



// Endpoint, Route, web service, 

// VISITS
app.post("/api/visits/addvisit", authenticateToken,addVisit(db))
app.get("/api/visits", authenticateToken,listVisit(db))
app.delete("/api/visits/:id" , authenticateToken ,deleteVisit(db));
app.get("/api/visits/:id" , authenticateToken ,detailsVisit(db));
// PAYMENTS

app.get("/api/payments", authenticateToken,listPayment(db))
app.post("/api/payments/addpayment/:id", authenticateToken,addPayment(db))
app.delete("/api/payments/:id" , authenticateToken ,deletePayment(db));



// PATIENTS


app.get("/api/patients", authenticateToken,listPatients(db))
app.post("/api/patients/addpatient", authenticateToken,addPatient(db))
app.delete("/api/patients/:id", authenticateToken,deletePatient(db))
app.get("/api/patients/:id", authenticateToken,detailsPatient(db))
app.put("/api/patients/:id", authenticateToken,updatePatient(db))


// USERS

//app.get("/" , getUser(db))
app.post("/api/login", login(db))
app.post("/api/users/adduser", authenticateToken ,addUser(db))
app.get("/api/users", authenticateToken ,getUser(db))
app.delete("/api/users/:id" , authenticateToken ,deleteUser(db));

// RDVS

app.get("/api/rdvs",authenticateToken,listRdvs(db))
app.post("/api/rdvs/addrdv", authenticateToken,addRdv(db))
app.delete("/api/rdvs/:id" , authenticateToken ,deleteRdv(db));


// app.get("/rdvs/:id", authenticateToken,listRdv(db))

 // Endpoint, Route, web service, 



 app.post('/api/contactpatient', async (req, res) => {
    const {email} = req.body;
    const {subject}  = req.body;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        
        auth: {
            user: 'lyla.skiles71@ethereal.email', // ethereal user
            pass: 'JGaN7DdAEmcY7Mrc67', // ethereal password
        },
    });
    
    const msg = {
        from: 'lyla.skiles71@ethereal.email', // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: "Long time no see", // plain text body
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
    res.send('Email Sent!')
  })
 
  app.get("*",function (req,res) { 
 
      res.sendFile(path.join(__dirname, "public", "index.html"));
 
   })

app.listen(8000,function(){
console.log("the server is listening to port 8000")
})
 

