import express from "express"
import ReportController from "../controllers/report.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

const ReportRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Reports:
 *      type: object
 *      required: 
 *        - Title
 *        - Contents
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Author: 
 *            type: ObjectId
 *        Title:
 *            type: String
 *        Context:
 *            type: String
 *        IsHandle: 
 *            type: boolean
 *        IsDeleted: 
 *            type: boolean
 */

/**
 * @swagger
 * /report/createReport:
 *   post: 
 *     tags: [Reports]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                Author:
 *                  type: ObjectId
 *                Title: 
 *                  type: string
 *                Context:
 *                  type: string           
 *     responses:
 *       201:
 *         description: Tạo report thành công
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
ReportRoute.post("/createReport",
    authMiddleware([Roles.ROLE_STAFF, Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
    ReportController.createReport
)

/**
 * @swagger
 * /report/getListReport:
 *   post:
 *     tags: [Reports]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               CurrentPage: 1 
 *               PageSize: 10
 *     responses:
 *       200:
 *         description: Lấy ra report thành công
 *       500:
 *         description: Internal server error
 */
ReportRoute.post("/getListReport",
    authMiddleware([Roles.ROLE_ADMIN]),
    ReportController.getListReport
)

/**
 * @swagger
 * /report/getListReportTimeTable:
 *   post:
 *     tags: [Reports]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               CurrentPage: 1 
 *               PageSize: 10
 *     responses:
 *       200:
 *         description: Lấy ra report thành công
 *       500:
 *         description: Internal server error
 */
ReportRoute.post("/getListReportTimeTable",
    authMiddleware([Roles.ROLE_ADMIN]),
    ReportController.getListReportTimeTable
)

/**
 * @swagger
 * /report/getReportDetail/{ReportID}:
 *   get:
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: ReportID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
ReportRoute.get("/getReportDetail/:ReportID",
    authMiddleware([Roles.ROLE_ADMIN]),
    ReportController.getReportDetail
)

/**
 * @swagger
 * /report/handelReport/{ReportID}:
 *   get:
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: ReportID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Cập nhật xử lý thành công
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
ReportRoute.get("/handelReport/:ReportID",
    authMiddleware([Roles.ROLE_ADMIN]),
    ReportController.changeHandleReport
)

/**
 * @swagger
 * /report/deleteReport/{ReportID}:
 *   get:
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: ReportID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Xoá report thành công
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
ReportRoute.get("/deleteReport/:ReportID",
    authMiddleware([Roles.ROLE_ADMIN]),
    ReportController.deletedReport
)

export default ReportRoute
