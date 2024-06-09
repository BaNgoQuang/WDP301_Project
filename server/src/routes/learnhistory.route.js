import express from "express"
import LearnHistoryController from "../controllers/learnhistory.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

const LearnHistoryRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    LearnHistorys:
 *      type: object
 *      required: 
 *        - Student
 *        - Teacher
 *        - Subject
 *        - RegisterDate
 *        - LearnNumber
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Student: 
 *            type: ObjectId
 *        Teacher: 
 *            type: ObjectId
 *        Subject: 
 *            type: ObjectId
 *        RegisterDate:
 *            type: date
 *        LearnNumber:
 *            type: number
 */

/**
 *  @swagger
 *  /learnhistory/createLearnHistory:
 *    post:
 *      tags: [LearnHistorys]
 *      requestBody:
 *        content:
 *          application/json:
 *              example:
 *                Teacher: 664c1480b8f11adfc4f4a85b
 *                Subject: 664c1480b8f11adfc4f4a85b 
 *                RegisterDate: 2024-06-12T01:00:00.000+00:004
 *                LearnNumber: 1
 *      responses:
 *        200:
 *          description: Tài khoản đăng ký thành công
 *        500:
 *           description: Internal server error
 */
LearnHistoryRoute.post("/createLearnHistory",
  authMiddleware([Roles.ROLE_STUDENT]),
  LearnHistoryController.createLearnHistory
)

/**
 *  @swagger
 *  /learnhistory/getListLearnHistory:
 *    post:
 *      tags: [LearnHistorys]
 *      requestBody:
 *        content:
 *          application/json:
 *              example:
 *                PageSize: 1 
 *                CurrentPage: 1
 *      responses:
 *        200:
 *          description: Tài khoản đăng ký thành công
 *        500:
 *           description: Internal server error
 */
LearnHistoryRoute.post("/getListLearnHistory",
  authMiddleware([Roles.ROLE_STUDENT]),
  LearnHistoryController.getListLearnHistory
)

export default LearnHistoryRoute
