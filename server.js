const express =require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
//Database conection
mongoose.connect(
    "mongodb+srv://kabil:kabil1996@cluster0.tdwut.mongodb.net/user-data?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true}
);
app.use(bodyParser.urlencoded({extended:true}));

const User = mongoose.model("users",{
    name:String,
    age:Number,
    phone:Number
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/save",(req,res)=>{
   const user = new User({
       name:req.body.name,
       age:req.body.age,
       phone:req.body.phone
   })
   user.save().then(()=>{
    res.send("Data Received");
   }).catch((err)=>{
        console.log(err);
        res.send("Data Not Received");
   })   
});
app.post("/update",(req,res)=>{
    User.findByIdAndUpdate({
        _id:req.body.id
    },
        {
            name:req.body.name,
            age:req.body.age,
            phone:req.body.phone
        }).then((result)=>{
            console.log(result);
            res.send("data updated");
        }).catch((err)=>{
            console.log(err);
            res.send("data not updated")
        })
})
//portsetup
app.listen(port,()=>{
    console.log("server started")
})