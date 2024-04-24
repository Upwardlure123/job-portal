import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import { getAllJobsController, deleteJobController, createJobController, jobStatsController, updateJobController } from "../controllers/jobsController.js"

const router = express.Router()

// routes
// CREATE JOB || POST
router.post("/create-job" , userAuth , createJobController)

// GET JOBS
router.get("/get-job" , userAuth , getAllJobsController)

// UPDATE JOB || PUT || PATCH
router.patch("/update-job/:id" , userAuth , updateJobController)

// DELETE JOB || DELETE
router.delete("/delete-job/:id" , userAuth , deleteJobController)

// JOB STATS FILTER || GET
router.get("/job-stats" , userAuth , jobStatsController)



export default router