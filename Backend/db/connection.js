import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/VANDRE`);
        console.log('\n MONGODB connected to host: ', connectionInstance.connection.host)
    } catch (error) {
        console.error("DB Connection Failed: ", error);
        process.exit(1)
    }
};

export default connectDB