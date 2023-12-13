/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import MyInput from '../../components/MyInput'
import { userContext } from '../../store/StoreProvider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { errorContext } from '../../store/ErrorProvider'
import { Button, Form, Input, Radio } from 'antd'

const LegalInfo = () => {
  const { userInfo, updateUserInfo } = useContext(userContext);
  const { errorData } = useContext(errorContext);
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [telError, setTelError] = useState('')
  const navigate = useNavigate()
  const goToAddress = (e: React.FormEvent<HTMLFormElement>) => {

    navigate(`/address`)


  }


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (

    <Form
      initialValues={{
        registration_number: userInfo.registration_number,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        tel: userInfo.tel,
      }}
      onFinish={goToAddress}
      autoComplete="off"
      onFinishFailed={onFinishFailed}
    // onSubmitCapture={goToAddress}
    >


      <MyInput
        fieldName={'first_name'}
        containerProps={{
          className: 'mb-20px'
        }}
        errorData={errorData}
        inputProps={{
          onChange: e => updateUserInfo({ ...userInfo, first_name: e.target.value }),
          value: userInfo?.first_name || ''
        }}
        title={'نام : '} />

      <MyInput
        errorData={errorData}

        fieldName={'last_name'}

        inputProps={{
          onChange: e => updateUserInfo({ ...userInfo, last_name: e.target.value }),
          value: userInfo?.last_name || ''
        }}
        title={'نام خانوادگی : '} />


      <MyInput

        fieldName={'registration_number'}
        containerProps={{
          className: 'mb-20px'
        }}
        errorData={errorData}
        inputProps={{
          onChange: e => updateUserInfo({ ...userInfo, registration_number: e.target.value }),
          value: userInfo?.registration_number || ''

        }}
        title={'شماره ثبت : '} />
      <MyInput
        fieldName={'tel'}
        mandatory={'شماره تلفن را وارد نمائید'}
        containerProps={{
          className: 'mb-20px'
        }}
        inputProps={{
          onChange: e => updateUserInfo({ ...userInfo, tel: e.target.value }),
          value: userInfo?.tel || ''

        }}

        title={'تلفن ثابت : '} />



      <Button className='w-100 mt-30px' type='primary' title='ادامه' htmlType='submit' >ادامه</Button>
    </Form>



  )
}

export default LegalInfo