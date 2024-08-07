import Joi from "joi"
import { getRegexObjectID } from "../utils/commonFunction.js"
import { fileValidation, parameterValidation } from "./common.validation.js"

const createBlog = async (req, res, next) => {
  const trueCondition = Joi.object({
    Description: Joi.string().min(1).required(),
    Title: Joi.string().min(1).required(),
    Content: Joi.string().min(1).required(),
  })
  const trueConditionWithFile = fileValidation("Avatar", "image")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getDetailBlog = async (req, res, next) => {
  const trueCondition = parameterValidation("BlogID")
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListBlog = async (req, res, next) => {
  const trueCondition = Joi.object({
    PageSize: Joi.number().integer().min(0).required(),
    CurrentPage: Joi.number().integer().min(0).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateBlog = async (req, res, next) => {
  const trueCondition = Joi.object({
    Teacher: Joi.string().pattern(getRegexObjectID()).required(),
    BlogID: Joi.string().pattern(getRegexObjectID()).required(),
    Title: Joi.string().min(1).required(),
    Content: Joi.string().min(1).required(),
  })
  const trueConditionWithFile = fileValidation("Avatar", "image")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const BlogValidation = {
  createBlog,
  getDetailBlog,
  getListBlog,
  updateBlog
}

export default BlogValidation
