let mongoose = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;