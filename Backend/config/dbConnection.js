const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://muhammadabrar341:Abrar672526@cluster0.igl7cey.mongodb.net/recipes?retryWrites=true&w=majority"
    );
    // const connect = await mongoose.connect(
    //   "mongodb://127.0.0.1:27017/recipes?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1"
    // );
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
