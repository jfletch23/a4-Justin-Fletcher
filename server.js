import 'dotenv/config';

import express from 'express'
import ViteExpress from 'vite-express';
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import responseTime from 'response-time'
const app = express()

import {MongoClient, ObjectId} from "mongodb"

let players_collection

app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(responseTime())

const check_connection_middleware = (req, res, next) => {
  if (players_collection !== undefined) {
    next()
  }
  else {
    res.status(503).send()
  }
}

app.use(check_connection_middleware)

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`

const client = new MongoClient(uri)

async function run() {
  await client.connect()
  players_collection = await client.db("BaseballProspectsDatabase").collection("Players")
}

run()

const add_middleware = async (req, res) => {
  const received_data = req.body
  const age = getAge(received_data.player_birthday.split("T")[0])
  received_data.player_age = age
  const overall = (Number(received_data.hit_tool) + Number(received_data.power_tool) + Number(received_data.run_tool) + +Number(received_data.arm_tool) + Number(received_data.field_tool)) / 5.0
  received_data.overall = Math.round(overall)
  //Hardcoding in UUID so I don't have to change my data but I'm not using user accounts either so no logging in or cookie with the UUID
  received_data.uuid = "6aa887363219c0141c32737d"
  const result = await players_collection.insertOne(received_data)
  if (result.acknowledged !== true) {
    res.status(504).send()
  }
  else {
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(JSON.stringify(result))
  }
}

const delete_middleware = async (req, res) => {
  const result = await players_collection.deleteOne({
    _id: new ObjectId(req.params.objectId)
  })
  if (result.acknowledged !== true) {
    res.status(504).send()
  }
  else if (result.deletedCount !== 1) {
    res.status(505).send()
  }
  else {
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(JSON.stringify(result))
  }  
}

const players_middleware = async (req, res) => {
    //Hardcoding UUID since I have no log in or cookie functionality in this assignment
    const players = await players_collection.find({"uuid" : "6aa887363219c0141c32737d"}).toArray()
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(JSON.stringify(players))
}

const update_middleware = async (req, res) => {
  const received_data = req.body
  const my_id = new ObjectId(received_data._id)
  const filter = {_id : my_id}
  const {_id, ...data_without_id} = received_data
  const specific_player = await players_collection.find({"_id" : my_id}).toArray()
  const {_id: player_id, player_age, overall, uuid, ...my_player} = specific_player[0]
  const changedKeys = Object.keys(my_player).filter(key => my_player[key] !== data_without_id[key])
  const tools_list = ["hit_tool", "power_tool", "run_tool", "arm_tool", "field_tool"]
  for (item of changedKeys) {
    if (item === "player_birthday") {
      age = getAge(data_without_id.player_birthday.split("T")[0])
      data_without_id.player_age = age
    }

    if (tools_list.includes(item)) {
      const overall = (Number(data_without_id.hit_tool) + Number(data_without_id.power_tool) + Number(data_without_id.run_tool) + +Number(data_without_id.arm_tool) + Number(data_without_id.field_tool)) / 5.0
      data_without_id.overall = Math.round(overall)
      break
    }
  }
  const updateData = {
    $set: data_without_id
  }
  const result = await players_collection.updateOne(filter, updateData)
  if (result.acknowledged !== true) {
    res.status(504).send()
  } 
  else if (result.modifiedCount !== 1) {
    res.status(505).send()
  }
  else {
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(JSON.stringify(result))
  }
}

app.get('/players', players_middleware)

app.post('/add', add_middleware)

app.delete('/delete/:objectId', delete_middleware)

app.put('/update', update_middleware)

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));

// Source - https://stackoverflow.com/a/7091965
// Posted by codeandcloud, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-04, License - CC BY-SA 3.0

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}