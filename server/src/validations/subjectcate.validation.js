import Joi from 'joi'
import { getRegexObjectID } from '../utils/commonFunction.js'

const createSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
    SubjectCateName: Joi.string().min(1).max(256).required(),
    Description: Joi.string().min(1).max(256).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
    PageSize: Joi.number().integer().min(1).required(),
    CurrentPage: Joi.number().integer().min(1).required(),
    TextSearch: Joi.string().empty(""),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
    SubjectCateID: Joi.string().pattern(getRegexObjectID()).required(),
    SubjectCateName: Joi.string().min(1).max(256).required(),
    Description: Joi.string().min(1).max(256).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getDetailSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
    SubjectCateID: Joi.string().pattern(getRegexObjectID()).required(),
    PageSize: Joi.number().integer().min(1).required(),
    CurrentPage: Joi.number().integer().min(1).required(),
    TextSearch: Joi.string().empty(""),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const SubjectCateValidation = {
  createSubjectCate,
  getListSubjectCate,
  updateSubjectCate,
  getDetailSubjectCate,
}

export default SubjectCateValidation