import { Col, Form, Row, Steps } from "antd"
import { useState } from "react"
import FormInfor from "./components/FormInfor"
import { Link, useNavigate } from "react-router-dom"
import { SignupContainerStyled } from "./styled"
import UserService from "src/services/UserService"
import { toast } from "react-toastify"
import FormSubject from "./components/FormSubject"

const SignupPage = () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    try {
      setLoading(true)
      let res = {}
      if (!!data?.IsByGoogle) {
        res = await UserService.registerByGoogle(data)
      } else {
        res = await UserService.register(data)
      }
      if (res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      navigate('/dang-nhap')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    {
      title: "Thông tin tài khoản",
      content: (
        <FormInfor
          form={form}
          data={data}
          setData={setData}
          current={current}
          setCurrent={setCurrent}
          handleRegister={handleRegister}
          loading={loading}
        />
      )
    },
    {
      title: "Chọn môn học",
      content: (
        <FormSubject
          form={form}
          data={data}
          setData={setData}
          handleRegister={handleRegister}
          loading={loading}
        />
      )
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
  }))

  return (
    <SignupContainerStyled>
      <Steps
        current={current}
        items={items}
        progressDot={true}
      />
      <Form form={form}>
        <Row>
          <Col span={24}>
            <div className="center-text fw-600 fs-25 mb-8">Đăng ký tài khoản</div>
            <div className="center-text">
              <span className="mr-4 mb-8 fs-16">Đã có tài khoản?</span>
              <Link className="fs-16" to={" /dang-nhap"}>Đăng nhập</Link>
            </div>
          </Col>
          {steps[current].content}
        </Row>
      </Form>
    </SignupContainerStyled >
  )
}

export default SignupPage