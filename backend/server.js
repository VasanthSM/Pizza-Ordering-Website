import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from "./routes/userRoutes.js";




const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json())
app.use(cors())


connectDB()



app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 