import mongoose from "mongoose";

const ConnectDatabase = async (cb?: Function) => {
  const uri = `mongodb+srv://tanmaysrkr:e9HXXHeZzN5c95EE@cluster0.eucuekw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(uri, {
      dbName: "propreturns",
    });
    console.log("You successfully connected to MongoDB!");
    cb && cb();
  } catch (error) {
    console.log(`Error while db connection: ${error}`);
  }
};

export default ConnectDatabase;
