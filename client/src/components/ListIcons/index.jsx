import {
  BsCheck,
  BsFileMusicFill,
  BsFillTrash3Fill,
  BsTrash2
} from "react-icons/bs"

import {
  SearchOutlined,
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import {
  AiFillEdit,
  AiOutlineBarChart,
  AiOutlineCamera,
  AiOutlineWarning,
  AiOutlineCheckCircle,
  AiOutlineUnorderedList,
  AiFillEye,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillBell
} from "react-icons/ai"

import {
  BiErrorAlt,
  BiLogIn,
} from "react-icons/bi"

import {
  TbLock,
  TbLockOpen,
} from "react-icons/tb"

import {
  FaLanguage,
  FaMoneyCheckAlt,
  FaChalkboardTeacher,
  FaUserCog,
  FaUserGraduate,
  FaRegFile
} from "react-icons/fa"

import { MdReportProblem } from "react-icons/md"

import { ImBooks } from "react-icons/im"

const ListIcons = {
  ICON_SEARCH: <SearchOutlined className="blue-text fs-20" />,
  ICON_LOADING: <LoadingOutlined
    style={{
      color: "#0078d4"
    }}
    spin
  />,
  ICON_MENUFOLD: <MenuFoldOutlined />,
  ICON_MENUUNFOLD: <MenuUnfoldOutlined />,
  ICON_LOGOUT: <BiLogIn className="fs-20" />,
  ICON_BLOCK: <TbLock className="fs-18" />,
  ICON_UNBLOCK: <TbLockOpen className="fs-18" />,
  ICON_CHECK: <BsCheck className="fw-800" />,
  ICON_STATISTIC: <AiOutlineBarChart className="fs-18" />,
  ICON_MUSIC: <BsFileMusicFill className="fs-18" />,
  ICON_LANGUAGE: <FaLanguage className="fs-18" />,
  ICON_PAYMENT: <FaMoneyCheckAlt className="fs-18" />,
  ICON_TEACHER: <FaChalkboardTeacher className="fs-18" />,
  ICON_STAFF: <FaUserCog className="fs-18" />,
  ICON_STUDENT: <FaUserGraduate className="fs-18" />,
  ICON_REPORT: <MdReportProblem className="fs-18" />,
  ICON_SUBJECT_CATE: <ImBooks className="fs-18" />,
  ICON_CAMERA: <AiOutlineCamera className="fs-18" />,
  ICON_DELETE: <BsFillTrash3Fill className="red-text fs-18" />,
  ICON_WARNING: <AiOutlineWarning className="red-text" />,
  ICON_TRASH:
    <BsTrash2
      style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
        width: "80px",
        color: '#ed5151'
      }}
    />,
  ICON_FILE_DELETE: <FaRegFile className="fs-18" />,
  ICON_ERROR: <BiErrorAlt className="fs-18" />,
  ICON_SUSCESS: <AiOutlineCheckCircle className="fs-18" />,
  ICON_LIST: <AiOutlineUnorderedList className="fs-18" />,
  ICON_EDIT: <AiFillEdit className="green-text fs-18" />,
  ICON_VIEW: <AiFillEye className="blue-text fs-18" />,
  ICON_CONFIRM: <AiFillCheckCircle className="fs-18 green-text" />,
  ICON_CLOSE: <AiFillCloseCircle className="fs-18 red-text" />,
  ICON_BELL: <AiFillBell className="fs-20 black-text" />,
}

export default ListIcons
