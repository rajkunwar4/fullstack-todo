import mongoose from "mongoose";

export const createDB=()=>{
    mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backendApi",
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((e) => console.log(e));

}

