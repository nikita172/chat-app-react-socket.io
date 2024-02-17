const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI,);
    console.log(`connection successful ${connection.connection.host}`.cyan.underline)
  } catch (err) {
    console.log(err)
  }
}
module.exports = connectDB;
