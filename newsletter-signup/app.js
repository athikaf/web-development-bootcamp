//ANGELA'S OLD CODE
// const express = require('express')
// const bodyParser = require('body-parser')
// const request = require('request')

// const app = express()

// app.use(express.static("public"))

// app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', function(req, res){
//     res.sendFile(__dirname + "/signup.html")
// })

// app.post('/', function(req, res){
//     let firstName = req.body.firstName
//     let lastName = req.body.lastName
//     let email = req.body.email

//     console.log(firstName, lastName, email);

//     let data = {
//         members: [
//             {email_address: email,
//             status: 'subscribed',
//             merge_fields: {
//                 FNAME: firstName,
//                 LNAME: lastName
//             }}
//         ]
//     };

//     let jsonData = JSON.stringify(data);

//     let options = {
//         url: 'https://us3.api.mailchimp.com/3.0/lists/LISTID',
//         method: 'POST',
//         headers:{
//             "Authorization": "sabrina_veras@live.com API KEY"
//         },
//         body: jsonData
//     }

//     request(options, function(error, response, body){
//         if(error){
//             console.log(error)
//             res.sendFile(__dirname + '/failure.html')
//         }else{
//             console.log(response.statusCode);
//             if(response.statusCode === 200){
//                 res.sendFile(__dirname + '/success.html')
//             }else{
//                 res.sendFile(__dirname + '/failure.html')
//             }
//         }
//     })
// })


// app.post('/failure', function(req, res){
//     res.redirect('/');
// })

// app.listen(5000, function(){
//     console.log('server is running on port 5000');
// })

// -----------------------------------------------------------
//NEW CODE THAT WORKS

const express = require("express");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const run = async () => {
    const response = await client.lists.addListMember("LIST ID", {
      email_address: subscribingUser.email,
      status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
    });
    res.sendFile(__dirname + "/success.html");
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  };
  run().catch((e) => res.sendFile(__dirname + "/failure.html"));
});

client.setConfig({
  apiKey: "API-Key",
  server: "us9", //it must be same as the last three characters of your api
});

app.listen(3000, function () {
  console.log("server running");
});



