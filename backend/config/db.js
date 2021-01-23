import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error Message: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectToDb;
