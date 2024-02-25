const mongoose = require('mongoose')

const connectionString = process.env.DATABASE


mongoose.connect(connectionString).then(()=>{
    console.log("mongoDB connection established");
}).catch((error)=>{
    console.log('mongoDB connection error');
})