import express from "express"
import { loginController, registerController } from "../controllers/authController.js"
import { rateLimit } from 'express-rate-limit'

// ip limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})


const router = express.Router()

//routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user collection
 *           example: GDXBSXNKCDHI
 *         name:
 *           type: string
 *           description: User name
 *           example: John
 *         lastName:
 *           type: string
 *           description: User last name
 *           example: Doe
 *         email:
 *           type: string
 *           description: User email address
 *           example: johndoe@gmail.com
 *         password:
 *           type: string
 *           description: User password (should be greater than 6 characters)
 *           example: john_doe123
 *         location:
 *           type: string
 *           description: User location city or country
 *           example: Mumbai
 */



/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */

/**
 * /**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: user created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal server error
 */




// REGISTER POST
router.post("/register" , limiter , registerController)


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login page
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */


// LOGIN || POST
router.post("/login" , limiter , loginController)


export default router