import mongoose from "mongoose";

//creating a schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required:true,
  },

  isComplete: {
    type: Boolean,
    default:false,
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

export const Task = mongoose.model("Task", taskSchema);
