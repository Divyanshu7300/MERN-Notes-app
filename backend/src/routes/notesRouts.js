import express from "express";
import { createAnotes, DeleteAnotes,getANote, getAllNotes, updateAnotes } from "../controllers/notesController.js";
const router=express.Router();

// router.get("/",(req,res)=>{
//     res.status(200).send("you got somthing from server");
// });
router.get("/",getAllNotes);
router.get("/:id",getANote);
router.post("/",createAnotes);
router.put("/:id",updateAnotes);
router.delete("/:id",DeleteAnotes)

// router.post("/",(req,res)=>{
//     res.status(200).json({message:"notes created successfully"});
// });
// router.put("/:id",(req,res)=>{
//    res.status(200).json({ message:"post Updated successfully!"});
//  });
// //http://localhost:5001/api/notes/2156
// router.delete("/:id",(req,res)=>{
//     res.status(200).json({message:"post deleted successfully!"});
// });

export default router
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