// Server Deployed to Vercel //

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;

// Middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.rkm8q7u.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const runServer = async() => {
    try {
        const mySkill = client.db("Portfolio").collection("skills");
        
        app.get('/skills', async(req, res) => {
            const query = {}
            const cursor = mySkill.find(query);
            const skills = await cursor.toArray();
            res.send(skills);
            // console.log(skills)
        })
    } finally {

    }
}
runServer().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Portfolio server in running");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})