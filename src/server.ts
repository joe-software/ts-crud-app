// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

// configure dotenv files
dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.DBSTRING

// configure template engine
app.use('/', express.static(__dirname + 'public'));
app.set('views', './src/views')
app.set('view engine', 'ejs')

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

app.get('/', (req, res) => {
//   res.send('testing');
    // console.log(req.body)
    res.render('index')
});

app.post('/submit-car-info', (req, res) => {
        console.log(req)
        res.render('index')
    });



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});