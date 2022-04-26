const express=require("express");
const cors=require("cors"); 

const {  } = require("./params/patients");
const { usersList } = require("./params/users");
const { generateAccessToken } = require("./middleware/utils");
const { authenticateToken } = require("./middleware/auth");

//database
const db = require("./models");

const { listPatients, deletePatient, addPatient, detailsPatient } = require("./controllers/patients.controller");
const { addRdv, listRdv,Allrdvs } = require("./controllers/rdv.controller");
const { login , getUser } = require("./controllers/users.conroller");
const { addVisit , listVisit } = require("./controllers/visits.controller");
const { listPayment , addPayment } = require("./controllers/payments.controller");




//config express
const app=express();
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

//access nested objects
app.use(express.urlencoded(true)) 
 app.use(cors({origin: "http://localhost:3000"}))

 


// Endpoint, Route, web service, 

// VISITS
app.post("/visit", authenticateToken,addVisit(db))
app.get("/visit", authenticateToken,listVisit(db))

// PAYMENTS

app.get("/payment", authenticateToken,listPayment(db))
app.get("/payment/addpayment", authenticateToken,addPayment(db))



// PATIENTS


app.get("/patients", authenticateToken,listPatients(db))
app.post("/patients/addpatients", authenticateToken,addPatient(db))
app.get("/patient/:id", authenticateToken,deletePatient(db))
app.get("/patients/:id", authenticateToken,detailsPatient(db))


// USERS

//app.get("/" , getUser(db))
app.post("/login", login(db))

// RDVS

app.get("/allrdvs",authenticateToken,Allrdvs(db))
app.post("/rdv", authenticateToken,addRdv(db))

// app.get("/rdvs/:id", authenticateToken,listRdv(db))

 // Endpoint, Route, web service, 




 


app.listen(8000,function(){
console.log("the server is listening to port 8000")
})
 

