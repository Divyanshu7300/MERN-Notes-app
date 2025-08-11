import mongoose from "mongoose";

// create schema

//create model


const noteSchema=new mongoose.Schema({
    title:{
    type:String,
    required:true
    },
    content:{
        type:String,
        require:true
    },
    },
    {timestamps:true}
);



const Note=mongoose.model("Note",noteSchema)

export default Note;