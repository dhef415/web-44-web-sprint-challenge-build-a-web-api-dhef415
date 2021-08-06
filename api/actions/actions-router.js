// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const router = express.Router()


router.get('/', (req,res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(()=>{
            res.status(404)
        })
})

router.get('/:id', (req,res) => {
    const { id } = req.params
    Actions.get(id)
        .then(byId => {
            if(!byId) {
                res.status(404).json({message:'nope'})
            } else {
            res.json(byId)  
            }
        })
        .catch(() => {
            res.status(404).json({message: 'naw-uh'})
        })
})

router.post('/', (req,res) => {
    Actions.insert(req.body)
        .then(posted => {
            res.status(201).json(posted)
        })
        .catch(() => {
            res.status(400).json({message:'you messed up'})
        })
})

router.put('/:id', (req,res) => {
    const { id } = req.params
    Actions.update(id, req.body)
        .then(updates => {
            if (!updates) {
                res.status(400).json({message:'try again'})
            } else {
                res.json(updates)
            }
        })
        .catch(() => {
            res.status(400).json({message: 'try again'})
        })
})




module.exports = router