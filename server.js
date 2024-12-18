const express = require('express');

const app = express();

app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.json({ tasks });
});

app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask && newTask.id && newTask.text) {
        tasks.push(newTask);
        res.status(201).json({ message: 'Task added', tasks });
    } else {
        res.status(400).json({ error: 'Task must have an id and text' });
    }
});

app.delete('/delete-task', (req, res) => {
    const taskIdToDelete = req.body.id;
    const index = tasks.findIndex(task => task.id === taskIdToDelete);
    if (index !== -1) {
        const removedTask = tasks.splice(index, 1);
        res.status(200).json({ message: 'Task deleted', removedTask, tasks });
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé`);
});
