// API documentation
import swaggerJSDoc from "swagger-jsdoc"; 
import swaggerUi from "swagger-ui-express"

import express from "express"; 

import dotenv from "dotenv";
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"
import "express-async-errors"
// files import
import connectDB from "./config/db.js";
// routes import
import testRoutes from "./routes/testRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import jobsRoute from "./routes/jobsRoute.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";
dotenv.config()

connectDB();

// swagger api config
// swagger api options
const options = {
    definition:{
        openapi: "3.0.0",
    info:{
        title: "Job portal application",
        description: "Node Express Job portal application"
    },
    servers:[
        {
            //url: "http://localhost:8080"
            url: "https://job-portal-app-libg.onrender.com"
        }
     ]
    },
    apis:['./routes/*.js']
}

const spec = swaggerJSDoc(options)


const app = express()

//middlewares
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/api/v1/test" , testRoutes)
app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/user" , userRoutes)
app.use("/api/v1/job" , jobsRoute)


// homeroute root
app.use("/api-doc" , swaggerUi.serve , swaggerUi.setup(spec))

// validation middleware
app.use(errorMiddleware)

const port = process.env.PORT || 8080

app.listen(port , ()=>{
    // console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${port}`);
})
