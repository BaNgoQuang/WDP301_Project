import { response } from "../utils/lib.js"
import BankingInfor from "../models/bankinginfor.js"
import TimeTable from "../models/timetable.js"
import { getOneDocument } from "../utils/queryFunction.js"
import User from "../models/user.js"

const fncCreateBankingInfor = async (req) => {
  try {
    const newBankingInfor = await BankingInfor.create(req.body)
    return response(newBankingInfor, false, "Tạo thông tin banking thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailBankingInfor = async (req) => {
  try {
    const UserID = req.user.ID
    const bankingInfor = await getOneDocument(BankingInfor, "User", UserID)
    if (!bankingInfor) return response({}, true, "Thông tin Banking không tồn tại", 200)
    return response(bankingInfor, false, "lấy ra thông tin thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListBankingInfor = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    let query = {
      UserBankName: { $regex: TextSearch, $options: "i" },
      IsDeleted: false
    }
    const bankingInfor = BankingInfor
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = BankingInfor.countDocuments(query)
    const result = await Promise.all([bankingInfor, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateBankingInfor = async (req) => {
  try {
    const { BankingInforID, BankID, UserBankName, UserBankAccount } = req.body
    const updatedBankingInfor = await BankingInfor.findByIdAndUpdate(
      BankingInforID,
      {
        BankID: BankID,
        UserBankName: UserBankName,
        UserBankAccount: UserBankAccount,
      },
      { new: true, runValidators: true }
    )
    if (!updatedBankingInfor) return response({}, true, "Có lỗi xảy ra", 200)
    return response(updatedBankingInfor, false, "Cập nhật thông tin Banking thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteBankingInfor = async (req) => {
  try {
    const BankingInforID = req.param.BankingInforID
    const deleteBanking = await BankingInfor.findByIdAndDelete(BankingInforID)
    if (!deleteBanking) return response({}, true, "Có lỗi xảy ra", 200)
    return response({}, false, "Xóa thông tin banking thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListPaymentInCurrentWeek = async (req) => {
  try {
    const today = new Date();

    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    endOfWeek.setHours(23, 59, 59, 999);
    console.log(startOfWeek + endOfWeek)

    const {CurrentPage, PageSize } = req.body
    let query = {
      DateAt: { $gte: startOfWeek, $lte: endOfWeek },
    }
    const timeTable = TimeTable
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = TimeTable.countDocuments(query)
    const result = await Promise.all([timeTable, total])

    const teacherCounts = {};
    result[0].forEach((timetable) => {
    teacherCounts[timetable.Teacher.toString()] = (teacherCounts[timetable.Teacher.toString()] || 0) + 1;
    });

    const teacherData = [];
    for (const teacherId in teacherCounts) {
    const teacherName = await User.findById(teacherId).then((user) => user.FullName); 
    teacherData.push({ _id: teacherId, teacherName, count: teacherCounts[teacherId] });
    }
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra Report thành công",
      200
    );
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const BankingInforService = {
  fncCreateBankingInfor,
  fncGetDetailBankingInfor,
  fncUpdateBankingInfor,
  fncDeleteBankingInfor,
  fncGetListBankingInfor,
  fncGetListPaymentInCurrentWeek
}

export default BankingInforService
