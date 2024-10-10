"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
// ObjectId required when using the mondo id field in a collection
const mongodb_1 = require("mongodb");
// configure dotenv files
dotenv.config();
// ** if type is declared for process.env variables it throws an error because it could also be undefined - this can be corrected using assertation functions  ** -- TODO
const app = express();
const port = process.env.PORT;
const uri = process.env.DBSTRING;
const path = require('path');
// enable application/JSON data handling from client requests
app.use(express.json());
// configure template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
// static file config
app.use(express.static(path.join(__dirname, 'public')));
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield client.connect();
            // Send a ping to confirm a successful connection
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield client.close();
        }
    });
}
run().catch(console.dir);
// respond with index page
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dataArr = [];
    yield client.connect();
    const myDB = client.db('ts-crud-app');
    const dbCollection = myDB.collection('car-data-collection');
    yield dbCollection.find().forEach((item) => dataArr.push(item));
    yield client.close();
    res.render('index', {
        carData: dataArr
    });
}));
app.post('/car-data-post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const myDB = client.db('ts-crud-app');
    const dbCollection = myDB.collection('car-data-collection');
    yield dbCollection.insertOne(req.body);
    yield client.close();
}));
app.delete('/delete-post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('delete called');
    yield client.connect();
    const myDB = client.db('ts-crud-app');
    const dbCollection = myDB.collection('car-data-collection');
    yield dbCollection.deleteOne({ _id: new mongodb_1.ObjectId(req.body.mongoid) });
    yield client.close();
}));
app.put('/update-post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('update called');
    yield client.connect();
    const myDB = client.db('ts-crud-app');
    const dbCollection = myDB.collection('car-data-collection');
    yield dbCollection.findOneAndReplace({ _id: new mongodb_1.ObjectId(req.body.mongoid) }, req.body);
    yield client.close();
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
