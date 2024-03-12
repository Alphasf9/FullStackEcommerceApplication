import express from 'express';
import { registerController, loginController, testController, forgotPasswordController } from "../controllers/authController.js"
import { requireSignIn, isAdmin } from "../middlewares/authmiddleware.js"


const router = express.Router();
//Register

router.post('/register', registerController)

router.post('/login', loginController)
router.get('/test', requireSignIn, isAdmin, testController)
router.post('/forgot-password', forgotPasswordController)

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
})

router.get('/admin-auth', isAdmin,requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
})



export default router