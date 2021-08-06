// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')


const router = express.Router()

router.get('/', (req,res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(

        )
})

router.get('/:id', (req,res) => {
    const { id } = req.params
    Projects.get(id)
        .then(byId => {
            if (!byId) {
                res.status(404).json({message: 'The product with the specified ID does not exist'})
            } else {
            res.status(200).json(byId)
            }
        })
        .catch(() => {
            res.status(500).json({message: 'The product information could not be retrieved'})
        })
})

router.post('/', (req,res) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(() => {
            res.status(400).json({message: 'nope!'})
        })
})

router.put('/:id', (req,res) => {
    const { id } = req.params
    Projects.update(id, req.body)
        .then(changes => {
            if (!changes) {
                res.status(400)
            } else {
                res.json(changes) 
            }
        })
        .catch(()=>{
            res.status(400)
        })
})

// router.delete('/:id', (req,res) => {
//     const { id } = req.params
//     Projects.get(id)
//         .then()
//     Projects.remove(id)
//         .then(deleted => {

//         })
// })

router.get('/:id/actions', (req,res) => {
    //***Works in postman***
    const { id } = req.params
    Projects.get(id)
        .then(actions => {
            if (!actions) {
                res.json([])
            } else {
                res.json(actions)
            }
        })
})




module.exports = router