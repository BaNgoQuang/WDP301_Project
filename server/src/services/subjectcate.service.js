import SubjectCate from "../models/subjectcate.js"
import { getOneDocument } from "../utils/commonFunction.js"
import { response } from "../utils/lib.js"

const fncCreateSubjectCate = async (req) => {
  try {
    const { SubjectCateName, Description } = req.body
    const subjectCate = await getOneDocument(SubjectCate, "SubjectCateName", SubjectCateName)
    if (!!subjectCate) return response({}, true, "Loại môn đã tồn tại", 200)
    const newSubjectCate = await SubjectCate.create({
      SubjectCateName,
      Description
    })
    return response(newSubjectCate, false, "Tạo mới môn học thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const fncGetListSubjectCate = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const subjectCates = await SubjectCate
      .find({
        SubjectCateName: { $regex: TextSearch, $options: "i" },
        IsDeleted: false,
      })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = await SubjectCate.countDocuments({
      SubjectCateName: { $regex: TextSearch, $options: "i" },
      IsDeleted: false,
    })
    return response(
      { List: subjectCates, Total: total },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateSubjectCate = async (req) => {
  try {
    const { SubjectCateID, SubjectCateName, Description } = req.body
    const checkExist = await getOneDocument(SubjectCate, "_id", SubjectCateID)
    if (!checkExist) return response({}, true, "Loại danh mục không tồn tại", 200)
    const checkExistName = await getOneDocument(SubjectCate, "SubjectCateName", SubjectCateName)
    if (!!checkExistName && !checkExist._id.equals(checkExistName._id))
      return response({}, true, `Loại danh mục ${SubjectCateName} đã tồn tại`, 200)
    const updatedSubjectCate = await SubjectCate.findByIdAndUpdate(
      SubjectCateID,
      { SubjectCateName, Description },
      { new: true, runValidators: true }
    )
    if (!updatedSubjectCate) {
      return response({}, true, `Không tìm thấy loại danh mục ${SubjectCateName}`, 200)
    }
    return response(updatedSubjectCate, false, "Cập nhật danh mục thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteSubjectCate = async (req, res) => {
  try {
    const { SubjectCateID } = req.params
    const deletedSubjectCate = await SubjectCate.findByIdAndUpdate(
      SubjectCateID,
      { IsDeleted: true },
      { new: true }
    )
    if (!deletedSubjectCate) {
      return response({}, true, "Không tìm thấy danh mục", 200)
    }
    return response(deletedSubjectCate, false, "Xoá danh mục thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}



const SubjectCateService = {
  fncCreateSubjectCate,
  fncGetListSubjectCate,
  fncUpdateSubjectCate,
  fncDeleteSubjectCate,
}

export default SubjectCateService
