const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");
require("./db/connect");
const user=require("./models/registers");
const port=process.env.PORT || 3000 ;

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
//console.log(path.join(__dirname,"../public "));

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use(express.static(static_path));

app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/" , (req,res) => {
   // res.send("hello froma aditi")
   res.render("index");
});
app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/signin",(req,res)=>{
    res.render("signin");
})


app.post("/login",async (req,res)=>{
    try {
      //   console.log(req.body.username);
        // res.send(req.body.username)
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password === cpassword)
        {
           const registeremployee = new user({
            username:req.body.username,
            email: req.body.email,
            password: password,
            confirmpassword: cpassword
            
           })
          const registered= await registeremployee.save();
          res.status(201).render("index_registration");
        }
        else{
            res.send("passwords are not matching")
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
})

//login check:
app.post("/signin",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
    //    console.log(`${email} and password is ${password}`)
       const useremail=await user.findOne({email:email});
      // res.send(useremail.password);
      // console.log(useremail);
      if(useremail.password === password)
      {
        res.status(201).render("index_signin");
      }else{
        res.send("password are not matching");
      }
    }catch(error){
        res.status(400).send("invalid email")
    }
    
})


app.get("/index",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
})




app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
})