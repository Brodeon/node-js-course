const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
    try {
        const client = await MongoClient.connect('mongodb+srv://rwuser:4rHEJjhpu6baaMn@cluster0-5kx3x.mongodb.net/shop?retryWrites=true&w=majority', {useUnifiedTopology: true});
        console.log('CONNECTED');
        _db = client.db();
        callback();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No db found!';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
