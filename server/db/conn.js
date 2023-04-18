const mongoose = require('mongoose');

require('dotenv').config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const dbName = process.env.MONGODB_NAME;

mongoose.set('strictQuery', true);

mongoose.connect(connectionString, {
    dbName: dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: (callback) => {
        dbConnection = mongoose.connection;

        dbConnection.on('error', console.error.bind(console, 'connection error: '));
        dbConnection.once('open', () => {
            console.log('Connected to MongoDB');
        })

        return callback();
    },
}