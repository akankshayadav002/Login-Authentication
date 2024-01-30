import express from 'express'
import UserController from '../controllers/UserController.js'

const router= express.Router()

//Publicroute

router.post('/register',UserController.userRegistration)
router.post('/login',UserController.userLogin)





export default router