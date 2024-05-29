import mongoose from "mongoose";


export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://vasanthsubburaj99:Vasanth24@cluster0.6k5ri1b.mongodb.net/pizza-ordering-website').then(()=> console.log("DB Is Connected"));
}