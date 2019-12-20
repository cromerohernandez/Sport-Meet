//mongoDB and mongoose connections

//Node.js module. It is a MongoDB object modeling tool designed to work in an asynchronous environment
const mongoose = require('mongoose');

//mongoose connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
    .catch(error => console.error(`An error ocurred trying to connect to de database ${MONGODB_URI}`, error))

//when you received the event 'SIGINT' (SIGINT = CTRL+C),
// close the connection with mongoose (function - second param)
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});