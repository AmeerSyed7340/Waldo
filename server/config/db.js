const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        console.log(process.env.DB_URI);
        const connect = await mongoose.connect(process.env.DB_URI);
        //on success
        console.log(`MongoDB connect: ${connect.connection.host}`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;