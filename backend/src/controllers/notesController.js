import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try{  
        const notes=await Note.find().sort({createAt:-1 })
        res.status(200).json(notes)
    }catch(error){
        console.error("Error",error);
       res.status(500).json({message:"internal server error"});
    }
};
export async function getANote(req,res){
    try{  
        const note=await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"not found"});
        res.json(note)
    }catch(error){
        console.error("Error",error);
       res.status(500).json({message:"internal server error"});
    }
}; 
export async function createAnotes(req,res){
    try{
        const {title,content}=req.body
        const newNote=new Note({title,content})
        await newNote.save()
        res.status(201).json({message:"note created successfully"})
 
    }catch(error){
        console.error("error while creating",error);
    }
};
export async function updateAnotes(req,res){
    try{
        const {title,content}=req.body
        const updateAnotes=await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true,
            },
        
        )
        
        if(!updateAnotes) return res.status(404).json({message:"not found"});
        
        res.status(200).json({updateAnotes})
    }catch(error){
        console.error("error while Updating",error);
        res.status(500).json({message:"Internal server error"})

    }
 }; 
export async function DeleteAnotes(req,res){
    try{
        const{title,content}=req.body
        const DeleteAnotes=await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"deleted Successfully"}) 
        if(!DeleteAnotes) return res.status(404).json({message:"not Found"});

    }catch(error){
        console.error("Error while deleteing",error);
    }
 };