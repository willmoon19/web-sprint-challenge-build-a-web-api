const Projects = require('./projects-model');

async function validateId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
            res.status(404).json({message: "project id not found"})
        } else {
            req.project = project
            next()
        }
    } catch(err) {
        next(err)
    }
}

async function checkList(req, res, next) {
    try {
        const { name, description, completed } = req.body
        if(!name || !description || !completed ) {
            res.status(400).json({message: 'missing required fields'})
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    validateId,
    checkList,

}