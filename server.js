const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const app=express();
app.use(express.json());
app.use(express.static('public'));
let db;
app.get("/", (req, res)=>{
    res.sendFile("index.html", {root: "public"});
});
app.post("/add", async (req, res)=>{
    await db.collection("books").insertOne(req.body);
    res.send("Book added successfully");
});
app.get("/books", async (req, res)=>{
    let query = {};
    if(req.query.condition && req.query.condition !== "All"){
        query.condition=req.query.condition;
    }
    if(req.query.search){
        query.title = {$regex: req.query.search, $options: "i"};
    }
    const books = await db.collection("books").find(query).toArray();
    res.json(books);
});
app.put("/update/:id", async (req, res)=>{
    await db.collection("books").updateOne({__id:new ObjectId(req.params.id)}, {$set:req.body});
    res.send("Book updated successfully");
});
app.delete("/delete/:id", async (req, res)=>{
    await db.collection("books").deleteOne({_id:new ObjectId(req.params.id)});
    res.send("Book deleted successfully");
});
async function start(){
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    db = client.db("BookExchangeDB");
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    }); 
}
start().catch(console.error);