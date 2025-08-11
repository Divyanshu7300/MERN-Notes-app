import express from "express";
import notesRouts from "./routes/notesRouts.js";
import { connectdb } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT=process.env.PORT_A




app.use(cors({
    origin:"http://localhost:5173",
}))
//cors is used to allow cross-origin requests, which is necessary when the frontend and backend are on different ports or domains.//it allows the frontend to make requests to the backend without being blocked by the browser's same-origin


//middleware
app.use(express.json());
//this middleware will aprse json boddies: req.body

//

app.use(rateLimiter);
//used mosthly for auth
app.use((req,res,next)=>{ 
    console.log(`req metod is ${req.method} & request URL is ${req.url}`);
    next();

})



app.use("/api/notes",notesRouts); 

// app.get("/api/notes",(req,res)=>{
//     res.send("divyandfskljfdahu");
// });
// //status() can be used as a property of res
// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({ message:"post created successfully!"});
// });
// app.put("/api/nptes/:id",(req,res)=>{
//     res.status(200).json({ message:"post Updated successfully!"});
// });
// //http://localhost:5001/api/notes/2156
// app.delete("api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"post deleted successfully!"});
// });

connectdb().then(()=>{
    app.listen(PORT,()=>{
    console.log("server is running ",PORT);
    
});
});



//