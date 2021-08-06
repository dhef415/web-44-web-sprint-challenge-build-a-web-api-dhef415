// add middlewares here related to projects
const Projects = require('./projects-model')

function checkIdExists(req, res, next) {

    const { id } = req.params
    Projects.findById(id)
      .then(project => {
        if (project) {
          req.project = project 
          next()
        } else {
          next({ message: `project with id ${id} not found!` })
        }
      })
      .catch(next)


}



  module.exports = checkIdExists;