// add middlewares here related to actions
const Actions = require('./actions-model')

function checkIdExists(req, res, next) {

    const { id } = req.params
    Actions.findById(id)
      .then(actions => {
        if (actions) {
          req.actions = actions 
          next()
        } else {
          next({ message: `actions with id ${id} not found!` })
        }
      })
      .catch(next)


}



  module.exports = checkIdExists;