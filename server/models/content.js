import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, 
  },
  metadata: {
    subject: String,      
    topic: String,         
    subtopic: String,     
    difficulty: String,    
    source: String,        
    page: Number,        
    timestamp: Number,     
  },
  embeddingId: {
    type: String,          
  },
});

const Content = mongoose.model("Content", contentSchema);
export default Content;
