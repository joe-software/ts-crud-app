// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
// ObjectId required when using the mondo id field in a collection
import { ObjectId } from "mongodb";

// configure dotenv files
dotenv.config();

// ** if type is declared for process.env variables it throws an error because it could also be undefined - this can be corrected using assertation functions  ** -- TODO

const app = express();
const port = process.env.PORT;
const uri = process.env.DBSTRING
const path = require('path');

// enable application/JSON data handling from client requests
app.use(express.json())

// configure template engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// static file config
app.use(express.static(path.join(__dirname, 'public')))

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

// respond with index page
app.get('/', async (req: any, res: any) => {
        let dataArr: {}[] = []
        await client.connect();
        const myDB = client.db('ts-crud-app')
        const dbCollection = myDB.collection('car-data-collection')
        await dbCollection.find().forEach((item: {}) => dataArr.push(item));
        await client.close();
        res.render('index', {
          carData: dataArr
        })
});

app.post('/car-data-post', async (req: any, res: any) => {

        await client.connect();
        const myDB = client.db('ts-crud-app')
        const dbCollection = myDB.collection('car-data-collection')
        await dbCollection.insertOne(req.body)
        await client.close();       
    });


    app.delete('/delete-post', async (req: any, res: any) => {
      console.log('delete called')
      await client.connect();
      const myDB = client.db('ts-crud-app')
      const dbCollection = myDB.collection('car-data-collection')      
      await dbCollection.deleteOne({_id: new ObjectId(req.body.mongoid)})
      await client.close(); 
    });

    app.put('/update-post', async (req: any, res: any) => {
      console.log('update called')
      await client.connect();
      const myDB = client.db('ts-crud-app')
      const dbCollection = myDB.collection('car-data-collection')      
      await dbCollection.findOneAndReplace({_id: new ObjectId(req.body.mongoid)}, req.body)
      await client.close(); 
  });


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});