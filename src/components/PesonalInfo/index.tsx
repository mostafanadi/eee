/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import MyInput from '../../components/MyInput'
import { userContext } from '../../store/StoreProvider'
import { useNavigate } from 'react-router-dom'
import { errorContext } from '../../store/ErrorProvider'
import { Button, Form } from 'antd'

const PersonalInfo = () => {
  const { userInfo, updateUserInfo } = useContext(userContext);
  const { errorData } = useContext(errorContext);
  const navigate = useNavigate()
  const goToAddress = (e: React.FormEvent<HTMLFormElement>) => {
    navigate(`/address`)
  }




  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (

    <Form
      onFinish={goToAddress}
      autoComplete="off"
      onFinishFailed={onFinishFailed}
      initialValues={{
        national_code: userInfo.national_code,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone: userInfo.phone,
      }}
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
        mandatory='لطفا کد ملی را وارد نمائید'
        fieldName={'national_code'}
        inputProps={{
          onChange: e => updateUserInfo({ ...userInfo, national_code: e.target.value }),
          value: userInfo?.national_code || ''
        }}
        title={'کدملی : '} />
      <MyInput
        mandatory='لطفا شماره تلفن را وارد نمائید'
        fieldName={'phone'}
        inputProps={{
          onChange: e => updateUserInfo({ ...userInfo, phone: e.target.value }),
          value: userInfo?.phone || ''
        }}
        title={'تلفن همراه : '} />
      <Button className='w-100 mt-30px' type='primary' title='ادامه' htmlType='submit' >ادامه</Button>
    </Form>



  )
}

export default PersonalInfo