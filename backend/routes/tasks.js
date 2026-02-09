const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.send(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    status: req.body.status,
    userId: req.userId,
  });
  res.send(task);
});

router.put("/:id", auth, async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: "Updated" });
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
});

module.exports = router;
