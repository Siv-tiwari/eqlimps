const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 80;


// database
mongoose.connect('mongodb://localhost/EQlimps_user_data',{useNewUrlParser:true,useUnifiedTopology:true});
var user = new mongoose.Schema({
    users_name: String,
    users_email: String
});
var user_model = mongoose.model('data',user);




app.use('/static',express.static('static'));        // adding css and js files
app.use(express.urlencoded({extended: true}));

app.use('/assets',express.static(__dirname+ "/assets"));        // for loading assets
app.use('/glb_file',express.static(__dirname+"/glb_file"));     // for loading glb file


//adding html
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/contacts',(req,res)=>{
    res.sendFile(path.join(__dirname,'/contacts.html'));
});


// fetching data from user and saving it to db
app.post('/contacts',(req,res)=>{
    var myData =  new user_model(req.body);
    myData.save().then(()=>{
        res.send("item saves successfully");
    }).catch(()=>{
        res.status(400).send("error occured");
    });
});



// server
app.listen(port);
console.log('Server started at http://localhost:' + port);
