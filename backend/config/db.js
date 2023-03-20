import mongoose from "mongoose"

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false)
    const conn = await mongoose.connect(
      "mongodb+srv://shreya1234:shreya1234@cluster0.qplymha.mongodb.net/Proshop?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    console.log(`MongoDB connection: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
