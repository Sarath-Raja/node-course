const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    try{
        //const task = new Task(req.body);
        const task = new Task({
            ...req.body,
            "owner": req.user._id
        })
        const result = await task.save()
        res.status(201).send(result)
    }catch(e){
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=2&skip=1
// GET /tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
    const isMatch = {};
    const sort = {};

    if(req.query.completed)
        isMatch.completed = req.query.completed === "true";
    
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    try{
        await req.user.populate({
            path: "tasks",
            match: isMatch,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try{
        const id = req.params.id;
        //const task = await Task.findById(id)
        const task = await Task.findOne({ _id: id, owner: req.user._id })
        //console.log(task)
        if(!task)
            return res.status(404).send()
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if(!isValid)
    return res.status(400).send({Error: "Invalid updates"});
    
    try{
        //const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if(!task)
            return res.status(404).send();

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.send(task);
        
    }catch(e){
        res.status(500).send(e);
    }
})


router.delete("/tasks/:id", auth, async(req, res) => {
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
        if(!task)
            return res.status(404).send();
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;
