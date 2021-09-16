const express = require("express");

const Eats = require("./eats/eats-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/eats", (req, res) => {
    Eats.getAll()
        .then(eats => {
        res.status(200).json(eats);
        })
        .catch(error => {
        res.status(500).json(error);
        });
});

server.get("/eats/id", (req, res) => {
  res.end()
});

server.post("/eats", async (req, res) => {
  if (!req.body.name) return res.status(422).end()
  const eats = await Eats.insert(req.body);
  res.status(201).json(eats)
});

server.delete("/eats/:id", (req, res) => {
  res.end()
});

server.put("/eats/:id", (req, res) => {
  res.end()
});

module.exports = server;
