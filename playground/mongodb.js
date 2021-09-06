// CRUD operations

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID, ObjectId} = require('mongodb')

// const id = new ObjectID();
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)
// console.log(ObjectId(id))

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager";

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error)
        return console.log("Unable to connect to database"+error);
    console.log("Connected to database successfully");

    const db = client.db(databaseName);


    // db.collection('users').findOne({_id:new ObjectID("602586eca459444688e60bc4")},(err, user) => {
    //     if(err)
    //         return console.log('Unable to fetch');
    //     console.log(user)
    // })

    // db.collection('users').find({age: 26}).toArray((err, users) => {
    //     if(err)
    //         return console.log('Unable to fetch');
    //     console.log(users)
    // })

    // db.collection('users').insertOne({
    //     name: "Sarath",
    //     age: 25
    // },(error, result) => {
    //     if(error)
    //         return console.log("Unable to insert user");
    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([{
    //     name: "Sree",
    //     age: 26
    // }, {
    //     name: 'Chandler',
    //     age: 19
    // }], (error, result) => {
    //     if(error)
    //         return console.log("Unable to insert users");
    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([{
    //     "description": "Study for 1 hour",
    //     "Completed": true
    // }, {
    //     "description": "Study of 2 hours",
    //     "Completed": false
    // }, {
    //     "description": "Study all weekend",
    //     "Completed": false
    // }], (error, r) => {
    //     if(error)
    //         return console.log('Unable to add tasks')
    //     console.log(r.ops)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID("602586eca459444688e60bc8")}, (error, task) => {
    //     if(error)
    //         return console.log('Unable to fetch task')
    //     console.log(task)
    // })

    // db.collection('tasks').find({Completed: false}).toArray((error, tasksArray) => {
    //     if(error)
    //         return console.log('Unable to fetch tasks')
    //     console.log(tasksArray)
    // })
    // db.collection('tasks').find({Completed: false}).count((error, count) => {
    //     if(error)
    //         return console.log('Unable to fetch tasks')
    //     console.log(count)
    // })

    // db.collection('users').updateOne({_id: new ObjectID("6025891870bc8175182b7805")}, {
    //     $set: {
    //         name: "Sarath Raja"
    //     }
    // }).then((result) => {
    //     console.log(result.result)
    //     console.log(result.matchedCount)
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(err)
    // })


    // db.collection('users').updateOne({_id: new ObjectID("6025891870bc8175182b7805")}, {
    //     $inc: {
    //         age: 1 // Increase age by 1
    //     }
    // }).then((result) => {
    //     console.log(result.result)
    //     console.log(result.matchedCount)
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(err)
    // })

    // db.collection('tasks').updateMany({Completed: false}, {
    //     $set: {
    //         Completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('users').deleteMany({
    //     age: 28
    // }).then((result) => {
    //     console.log(result.deletedCount)
    // }).catch((err) => {
    //     console.log(err);
    // })

    db.collection('tasks').deleteOne({
        description: "Study all weekend"
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    })
});