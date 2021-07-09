const express = require('express')
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const {
    validateId,
    checkAction
} = require("./actions-middlware");


const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then(data => {
        res.json(data)
    })
    .catch(next)
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', checkAction, async (req, res, next) => {
    try {
        const data = await Actions.insert(req.body)
        if(!data) {
            res.status(400)
        } else {
            res.json(data)
        }  
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateId, checkAction, (req, res, next) => {
    if(!req.body) {
        res.status(400)
    } else {
    Actions.update(req.params.id, req.checkedAction)
    .then(data => {
        res.json(data)
    })
    .catch(next)
}})

router.delete('/:id', validateId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(data => {
        console.log(data)
    })
    .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(400).json({message: "check go bouncy bounce"})
})


module.exports = router