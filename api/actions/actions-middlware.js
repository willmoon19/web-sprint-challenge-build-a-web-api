const Actions = require('./actions-model');

async function validateId(req, res, next) {
    try {
      const action = await Actions.get(req.params.id)
      if(!action) {
        res.status(404).json({message: "action not found"})
      } else {
        req.action = action
        next()
      }
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
        error: err.message
      })
    }
  }

function checkAction(req, res, next) {
        const { project_id, description, notes, completed } = req.body
        if(!project_id, !description || !notes || !completed) {
            res.status(400)
        } else {
            req.checkedAction = { project_id, description, notes, completed }
            next()
        }
}


module.exports = {
    validateId,
    checkAction
}