const mongodb = require('mongodb');
var MongoClient=mongodb.MongoClient; 
// connect to MongoDB

const redis = require('redis');
const client = redis.createClient();
var dbo = null;
MongoClient.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.log(chalk.red(err));
        process.exit(0);
    }
    dbo = db.db('admin');
    console.log('connected to the database');
});

client.on("connect", () => {
    console.log('connected to Redis');
});

// function getArticle(name) {
//     return new Promise((resolve, reject) => {
//         resolve(dbo.collection('mock').find({
//             first_name: name
//         }).toArray())
//     });
// }



function getArticle(gender) {
    return new Promise((resolve, reject) => {
        client.get(gender,(err, reply) => {
            if(err) {
                console.log(err);
            } else if(reply) {
                console.log('sending from redis')
                resolve(reply);
            } else {
                dbo.collection('mock').find({
                    gender: gender
                }).toArray((err, articleData) => {
                    if(err) {
                        return reject(err);
                    }
                    if(articleData.length > 0) {
                        // set in redis
                        client.set(gender, JSON.stringify(articleData));
                    }
                    console.log('sending from database')
                    resolve(articleData);
                });
            }
        });
    });
}

module.exports = {
    getArticle: getArticle
};