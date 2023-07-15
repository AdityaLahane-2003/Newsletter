const express = require("express"); 
const request = require("request"); 
const bodyParser = require("body-parser");
const https = require("https");
const app=express();

//We use fuunction of Express that is statis to use the local css file and Images 
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true})); 

app.get("/", function (req,res) {
    res.sendFile(__dirname+"/signup.html");
}) 

app.post("/", function (req,res) {
    const fName=req.body.fName 
    const lName=req.body.lName 
    const email=req.body.email 

    const data = {
        members:[
           {
               email_address:email,
               status:"subscribed",
               merge_fields:{
                   FNAME:fName,
                   LNAME:lName 
               }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/15b775ed83"; 
    const options = {
        method:"POST", 
        auth:"aditya:257f73b586d8bb70cd2595799a1c6ef2-us21"
    } 


    // https.request(url,options,callback)

   const request = https.request(url,options,function (response) {
       response.on("data",function (data) {
        console.log(JSON.parse(data));  
       }) 
      if ( response.statusCode===200) {
        res.sendFile(__dirname+"/success.html");
        
    } else {
          res.sendFile(__dirname+"/failure.html");
        
      }
   }) 

   request.write(jsonData); 
   request.end(); 
})

app.post("/failure", function (req,res) {
    res.redirect("/");
})

app.listen(process.env.PORT ||3000, function () {
    console.log("Server Running"); 
})

//b99511cddc815acf22a751546c165dd4-us21m -- API KEY 
//15b775ed83 -- Unique ID 