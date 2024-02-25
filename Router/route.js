const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectContoller')
const jwtMiddleware =require('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

//create a router object of express to define routes(paths)
const router= new express.Router()



//Register API routes
router.post('/register',userController.register)
//login
router.post('/login',userController.login)

//add user project api 
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)



// get user projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)

//get all projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get home projects
router.get('/project/home-projects',projectController.getHomeProjects)




module.exports=router

