const express = require('express');
const Projects = require('./projects-model');
const {
    validateId,
    checkList,
} = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
    .then(data => {
        res.json(data)
    })
    .catch(next)
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', checkList, async (req, res, next) => {
    try {
        const proj = await Projects.insert(req.body)
        if(!proj) {
            res.status(400)
    } else {
        res.json(req.checkedProj)
    }} catch(err) {
        next(err)
    }
})

router.put('/:id', validateId, checkList, (req, res, next) => {
    if(!req.body) {
        res.status(400).json({message: "missing things"})
    } else {
        Projects.update(req.params.id, req.checkedProj)
            .then(data => {
                res.json(data)
            })
            .catch(next)
    }
})

router.delete('/:id', validateId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(data => {
            console.log(data)
        })
        .catch(next)
})

router.get('/:id/actions', validateId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({message: "check go bouncy bounce"})
})

module.exports = router