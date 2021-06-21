const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const bodyParser = require('body-parser');

const app = express();

let temp1 
let temp2
let temp3
let temp4

//allow cross origin
app.use(cors());
//body parser for json data
app.use(express.json());

//body parser for form data
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"));

//=====================
app.use('/upload',express.static('upload'));

const shopRt = require('./routes/shopRt');
app.use("/shop",shopRt);

const userRt = require('./routes/userRt');
app.use("/user",userRt);

const basicDataRt = require('./routes/basicDataRt');
app.use("/basicdata",basicDataRt);

const jobRt = require('./routes/jobRt');
app.use("/job",jobRt);

app.get("/test",(req,res)=>{
    return res.status(200).json({msg:"Pass :you access to server"});
})

//----------------------------------------
app.post('/vrp1rec', function(req,res) {
    temp1={ myip:req.body.myip,
            timestamp:new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})
    }
    return res.status(200).send("record from 1")
  });
  
  app.post('/vrp2rec', function(req,res) {
    temp2={ myip:req.body.myip,
            timestamp:new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})
    }
    return res.status(200).send("record from 2")
  });
  
  app.post('/vrp3rec', function(req,res) {
    temp3={ myip:req.body.myip, 
            timestamp:new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})
    }
    return res.status(200).send("record from 3")
  });
  
  app.post('/vrp4rec', function(req,res) {
    temp4={ myip:req.body.myip, 
            timestamp:new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})
    }
    return res.status(200).send("record from 4")
  });
  //-----------------------------------
  app.get('/vrp1get', function(req,res) { return res.status(200).send(temp1) });
  app.get('/vrp2get', function(req,res) { return res.status(200).send(temp2) });
  app.get('/vrp3get', function(req,res) { return res.status(200).send(temp3) });
  app.get('/vrp4get', function(req,res) { return res.status(200).send(temp4) });
  //-----------------------------------------
//Serve static assets if in production
if(process.env.NODE_ENV==='production'){
    app.use(express.static('../client/build'));
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'/../client','build','index.html'));
    })
  }

//never reach this line under development
app.use((req,res,next)=>{
    const error=new Error();
    error.status=404;
    error.message="Not Found";
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;

/*
http://localhost:3000/upload/ab80a5f4-dbc0-4f69-9b77-67089b253ae1-p01.jpeg
*/