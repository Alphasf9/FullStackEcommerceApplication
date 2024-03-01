import express from 'express';
import { registerController, loginController, testController } from "../controllers/authController.js"
import { requireSignIn, isAdmin } from "../middlewares/authmiddleware.js"


const router = express.Router();
//Register

router.post('/register', registerController)

router.post('/login', loginController)
router.get('/test', requireSignIn, isAdmin, testController)

export default router