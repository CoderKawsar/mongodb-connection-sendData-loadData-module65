/*=======================
  Basic Setup
=======================*/
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// mongodb credentials
// user: dbuser1;
// password: ma6NEwYgRnhVBPJU;

/*=======================
  Database Connection
=======================*/
const uri =
  "mongodb+srv://dbuser1:ma6NEwYgRnhVBPJU@cluster0.z64ff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/*=======================
  Send data to database
=======================*/
async function run() {
  try {
    await client.connect();
    const database = client.db("foodExpress");
    const collection1 = database.collection("user");

    const doc = {
      name: "Pori Moni",
      email: "porimoni@gmail.com",
    };
    const result = await collection1.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running my node crud server");
});

app.listen(port, () => {
  console.log("crud server is running");
});
