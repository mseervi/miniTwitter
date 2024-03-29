import mongoose from "mongoose";

import config from "./config/config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.DB_CONNECTION_URI)
        console.log("Database Connected")
    } catch (error) {
        console.error(`database connectionan error: ${error.stack}`)
    }
}
                
              

export default connectDB;