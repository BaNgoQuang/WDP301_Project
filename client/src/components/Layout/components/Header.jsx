import { Col, Dropdown, Empty, Menu, Row, Tooltip } from "antd"
import { BadgeStyled, HeaderContainerStyled, HeaderStyled } from "../styled"
import logo from '/logo.png'
import { MenuCommon } from "../MenuItems"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import ListIcons from "src/components/ListIcons"
import InputCustom from "src/components/InputCustom"
import { handleLogout } from "src/lib/commonFunction"
import moment from "moment"
import { useEffect, useState } from "react"
import NotificationService from "src/services/NotificationService"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import socket from "src/utils/socket"

const NotificationItem = ({
  data,
  navigate,
  handleSeenNotification
}) => {
  return (
    <div
      onClick={() => {
        handleSeenNotification()
        navigate(`/dashboard/${data?.Type}`)
      }}
      style={{ margin: '8px 0' }}
      className={data?.IsSeen ? "gray-text" : "black-text not-seen-notify"}
    >
      <p>
        {data?.Content}
      </p>
      <p>
        {moment(data.createdAt).calendar()}
      </p>
    </div>
  )
}


const Header = () => {

  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [notifiNotSeen, setNotifiNotSeen] = useState(0)

  const handleSeenNotification = async () => {
    const res = await NotificationService.seenNotification(global?.user?._id)
    if (res?.isError) return
    getNotifications()
  }

  const getNotifications = async () => {
    const res = await NotificationService.getListNotification(global?.user?._id)
    if (res?.isError) return
    setNotifications(res?.data?.List)
    setNotifiNotSeen(res?.data?.NotSeen)
  }

  useEffect(() => {
    if (!!global?.user?._id && global?.user?.RoleID === 1) getNotifications()
  }, [])

  const menuAccoutUser = [
    {
      key: Router.PROFILE,
      isView: true,
      label: (
        <div>Profile</div>
      ),
      onClick: () => navigate(Router.PROFILE)
    },
    {
      key: Router.CAI_DAT_TAI_KHOAN,
      isView: true,
      label: (
        <div>Cài đặt tài khoản</div>
      ),
      onClick: () => navigate(Router.CAI_DAT_TAI_KHOAN)
    },
    {
      key: Router.LICH_HOC,
      isView: global?.user?.RoleID === 2,
      label: (
        <div>Lịch học</div>
      ),
      onClick: () => navigate(Router.LICH_HOC)
    },
    {
      key: Router.HOP_THU_DEN,
      isView: true,
      label: (
        <div>Hộp thư đến</div>
      ),
      onClick: () => navigate(Router.HOP_THU_DEN)
    },
    {
      key: Router.THANH_TOAN,
      isView: true,
      label: (
        <div>Thanh toán</div>
      ),
      onClick: () => navigate(Router.THANH_TOAN)
    },
    {
      label: (
        <div>Đăng xuất</div>
      ),
      onClick: () => handleLogout(dispatch, navigate)
    },
  ]

  const itemsNotification = [
    {
      key: '1',
      label: (
        notifications?.length > 0 ?
          <div style={{ width: '300px', padding: '12px' }}>
            {
              notifications?.map((i, idx) =>
                <NotificationItem
                  key={idx}
                  data={i}
                  navigate={navigate}
                  handleSeenNotification={handleSeenNotification}
                />
              )
            }
          </div>
          :
          <Empty description="Chưa có thông báo" />
      )
    }
  ]

  socket.on('get-notification', (data) => {
    setNotifications([...notifications, data])
    setNotifiNotSeen(notifiNotSeen + 1)
  })

  return (
    <HeaderContainerStyled>
      <HeaderStyled>
        <Row>
          <Col span={16} className="d-flex-sb">
            <img
              className="cursor-pointer"
              onClick={() => navigate("/")}
              src={logo}
              alt=""
              style={{ width: '35px', height: "50px", marginTop: '5px' }}
            />
            {
              (global?.user?.RoleID !== 1 || global?.user?.RoleID !== 2) &&
              <div style={{ flex: 1 }}>
                {
                  global?.user?.RoleID !== 1 ?
                    <Menu
                      mode="horizontal"
                      items={MenuCommon()}
                      selectedKeys={location?.pathname}
                      onClick={(e) => navigate(e?.key)}
                    />
                    :
                    <div></div>
                }
              </div>
            }
          </Col>
          <Col span={8} className="d-flex-end">
            {
              ![1, 2]?.includes(global?.user?.RoleID) ?
                <Dropdown
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow
                  overlay={
                    <>
                      <InputCustom
                        placeholder="Bạn muốn học gì?"
                        style={{ width: "500px" }}
                      />
                    </>
                  }
                >
                  <div>{ListIcons.ICON_SEARCH}</div>
                </Dropdown>
                :
                <Dropdown
                  menu={{ items: itemsNotification }}
                  trigger={['click']}
                  // onClick={() => {
                  //   if (notifiNotSeen !== 0) {
                  //     handleSeenNotification()
                  //   }
                  // }}
                  onOpenChange={e => {
                    if (!e) {
                      if (notifiNotSeen !== 0) handleSeenNotification()
                    }
                  }}
                >
                  <BadgeStyled
                    size="small"
                    count={notifiNotSeen}
                    style={{ fontSize: '10px' }}
                  >
                    <ButtonCircle
                      icon={ListIcons.ICON_BELL}
                    />
                  </BadgeStyled>
                </Dropdown>
            }
            <div className="ml-12 mb-10">
              {
                global?.user?._id ?
                  <Tooltip arrow={false} title={global?.user?.FullName} trigger="hover">
                    <Dropdown menu={{ items: menuAccoutUser }} trigger={['click']}>
                      <img
                        style={{
                          display: "block",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%"
                        }}
                        src={global?.user?.AvatarPath}
                        alt=""
                      />
                    </Dropdown>
                  </Tooltip>
                  :
                  <div
                    className="d-flex-end cursor-pointer"
                    onClick={() => navigate("/dang-nhap")}
                  >
                    <img
                      src="https://takelessons.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon-avatar.95340bc0.png&w=1920&q=75"
                      alt=""
                      style={{
                        // width: '32px',
                        height: "35px"
                      }}
                    />
                    <span className="ml-12 fs-16">Đăng nhập</span>
                  </div>
              }
            </div>
          </Col>
        </Row>
      </HeaderStyled>
    </HeaderContainerStyled>
  )
}

export default Header