import mongoose from "mongoose"
import { Env } from "./env.config"

const connctDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      // Additional options for replica set and transactions
      readPreference: "primary",
      retryWrites: true,
      w: "majority",
      // Ensure we can use transactions
      readConcern: { level: "majority" },
      writeConcern: { w: "majority", j: true, wtimeout: 1000 },
    })
    console.log("Connected to MongoDB database with replica set support")
    console.log("MongoDB transactions are now available")
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error)
    process.exit(1)
  }
}

export default connctDatabase
