const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.status(200).json({ tasks });
});

app.post('/add-task', (req, res) => {
    const { task } = req.body;
    tasks.push(task);
    res.status(201).json({ tasks });
});

app.delete('/delete-task', (req, res) => {
    const { id } = req.body;
    tasks = tasks.filter(task => task.id !== id);
    res.status(200).json({ tasks });
});

module.exports = app;
