const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const port=process.env.PORT || 3000;
const staticPath=path.join(__dirname,"../public");
app.use(cors());
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose.connect("mongodb+srv://asmit1655:ashutosh1655@cluster0.2xjpjxq.mongodb.net/user?retryWrites=true&w=majority")
const schema={
  name:String,
  email:String,
  password:String
}
const userDetails=mongoose.model("userDetails",schema);
app.get("/",function(req,res){
  res.sendFile(path.join(__dirname + "../public/index.html"));
});
app.post("/",function(req,res){
  let newUser=new userDetails({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  })
  newUser.save();
  res.redirect("/");
});
app.listen(port,function(){
  console.log(`Server started at port ${port}`);
});