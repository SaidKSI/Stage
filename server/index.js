const express=require("express");
const cors=require("cors"); 

const {  } = require("./params/patients");
const { usersList } = require("./params/users");
const { generateAccessToken } = require("./middleware/utils");
const { authenticateToken, authenticateRole } = require("./middleware/auth");

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
app.use(express.urlencoded({extended: false}))

//access nested objects
app.use(express.urlencoded(true)) 
 app.use(cors({origin: "http://localhost:3000"}))

 


// Endpoint, Route, web service, 

// VISITS
app.post("/visits/addvisit", authenticateToken,addVisit(db))
app.get("/visits", authenticateToken,listVisit(db))
app.delete("/visits/:id" , authenticateToken ,deleteVisit(db));
app.get("/visits/:id" , authenticateToken ,detailsVisit(db));
// PAYMENTS

app.get("/payments", authenticateToken,listPayment(db))
app.post("/payments/addpayment/:id", authenticateToken,addPayment(db))
app.delete("/payments/:id" , authenticateToken ,deletePayment(db));



// PATIENTS


app.get("/patients", authenticateToken,listPatients(db))
app.post("/patients/addpatient", authenticateToken,addPatient(db))
app.delete("/patients/:id", authenticateToken,deletePatient(db))
app.get("/patients/:id", authenticateToken,detailsPatient(db))
app.put("/patients/:id", authenticateToken,updatePatient(db))


// USERS

//app.get("/" , getUser(db))
app.post("/login", login(db))
app.post("/users/adduser", authenticateToken ,addUser(db))
app.get("/users", authenticateToken ,getUser(db))
app.delete("/users/:id" , authenticateToken ,deleteUser(db));

// RDVS

app.get("/rdvs",authenticateToken,listRdvs(db))
app.post("/rdvs/addrdv", authenticateToken,addRdv(db))
app.delete("/rdvs/:id" , authenticateToken ,deleteRdv(db));


// app.get("/rdvs/:id", authenticateToken,listRdv(db))

 // Endpoint, Route, web service, 




 


app.listen(8000,function(){
console.log("the server is listening to port 8000")
})
 

