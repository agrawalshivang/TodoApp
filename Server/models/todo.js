import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

const Todo=new mongoose.model("Todo",todoSchema);

export default Todo;