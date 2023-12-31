const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://dheaanggita:DheaAnggita18_@todolist.xlyvxfh.mongodb.net/')

app.post('/add', (req, res) => {
    const task = req.body.task
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/getByIsDone/:isDone', (req, res) => {
    const { isDone } = req.params;

    TodoModel.find({ isDone: isDone === 'true' })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const isDone = req.body.isDone
    TodoModel.findByIdAndUpdate({_id: id}, {isDone: isDone})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.listen(3000, () => {
    console.log("server is running");
})
