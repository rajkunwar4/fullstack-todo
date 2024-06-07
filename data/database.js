import mongoose from "mongoose";

export const createDB=()=>{
    mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backendApi",
  })
  .then((c) => console.log(`connected to mongoDB with ${c.connection.host}`))
  .catch((e) => console.log(e));

}

