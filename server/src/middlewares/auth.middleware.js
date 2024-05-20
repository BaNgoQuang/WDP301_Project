import { response } from '../utils/lib.js'
import * as dotenv from "dotenv"
import { decodeData } from '../utils/commonFunction.js'
dotenv.config()

const checkExistToken = (req) => {
  let check = false
  if (!!req.headers.token) {
    check = true
  }
  return check
}

const authMiddleware = (Roles) => {
  return (req, res, next) => {
    const checkToken = checkExistToken(req)
    if (!checkToken) {
      return res.status(401).json(
        response({}, true, 'Không có token')
      )
    }
    const token = req.headers.token.split(' ')[1]
    const data = decodeData(token)
    if (!data) {
      return res.status(401).json(
        response({}, true, "Token không có dữ liệu")
      )
    }
    if (Roles.includes(data.RoleID)) {
      req.user = data
      next()
    } else {
      return res.status(403).json(
        response({}, true, 'Bạn không có quyền')
      )
    }
  }
}

export default authMiddleware
