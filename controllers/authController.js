import userModels from "../models/userModels.js";
import { ApiError } from "../helpers/ApiError.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from "../helpers/Apiresponse.js";
import jwt from 'jsonwebtoken'



const registerController = asyncHandler(async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (
        [name, email, password, phone, address].some((field) => field.trim() === "")
    ) {
        throw new ApiError(401, "Please fill all the credentials")
    }

    // check user
    const existingUser = await userModels.findOne({ email })

    if (existingUser) {
        throw new ApiError(402, "Already registered user")
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModels({ name, email, phone, address, password: hashedPassword }).save();

    return res.status(201).json(
        new ApiResponse(200, user, "User registered successfully")
    )
})

const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(401, "Invalid email or password");
    }

    const user = await userModels.findOne({ email });
    if (!user) {
        throw new ApiError(401, "sorry,email is not registered");
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
        throw new ApiError(401, "Inavlid password");
    }

    const token = await jwt.sign({
        _id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    return res.status(200).send({
        sucess: true,
        message: "login success",
        user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        },
        token
    })
})

const testController = (req, res) => {
   res.send("protected route")
}

export {
    registerController,
    loginController,
    testController
}
