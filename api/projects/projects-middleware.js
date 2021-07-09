const Projects = require('./projects-model');

function validateId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
        if(!project) {
            res.status(404).json({message: "project id not found"})
        } else {
            req.project = project
            next()
        }})
        .catch(next)
}

 function checkList(req, res, next) {
        const { name, description, completed } = req.body
        if(!name || !description || !completed ) {
            res.status(400)
        } else {
            req.checkedProj = {name, description, completed}
            next()
        }
}

module.exports = {
    validateId,
    checkList,

}