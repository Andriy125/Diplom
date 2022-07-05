import mongoose from "mongoose";

mongoose.connect(
  "mongodb://localhost:27017/admin",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err: any) => {
    if (err) {
      throw Error(err);
    }
  }
);
