import mongoose from "mongoose";

export const connectToMongoDB = () => {
  mongoose
    .connect(process.env.DB_LINK as string)
    .then(() => console.log("DB successfully connected"))
    .catch((err) =>
      console.log(`Some error occured while connecting to DB: ${err}`)
    );
};