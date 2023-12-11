import mongoose from "mongoose";

const URI = `mongodb+srv://nicolasrivass2001:oKiRuu3uaSSVpxgc@cluster0.edas4ca.mongodb.net/ecommerce?retryWrites=true&w=majority`

mongoose.connect(URI)
.then(()=>console.log("Conectado a la DB"))
.catch(error=>console.log(error))