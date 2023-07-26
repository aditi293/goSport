const mongoose=require("mongoose");
//const db="mongodb+srv://aditi:Helloatlas123@aditiapi.gbypjx2.mongodb.net/employeeSchema?retryWrites=true&w=majority";
const db="mongodb+srv://aditi:Helloatlas123@aditiapi.gbypjx2.mongodb.net/employeeSchema?retryWrites=true&w=majority";

mongoose.connect(db).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>
    console.log(`no connection`)
);
