import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../store/StoreProvider';
import { useNavigate } from 'react-router-dom';
import MyInput from '../../components/MyInput';
import { errorContext } from '../../store/ErrorProvider';
import { Button, Form } from 'antd';

const BankInfo = () => {
    const { userInfo, updateUserInfo } = useContext(userContext)
    const { errorData } = useContext(errorContext);

    const navigate = useNavigate()

    const goToPreviewPage = () => {
        navigate('/preview')

    }
    useEffect(() => {
        if (!userInfo?.type) {
            navigate('/info')
        }
    }, [userInfo])
    return (
        <Form
            initialValues={{
                bank_name: userInfo.bank_name,
                iban: userInfo.iban
            }}
            onFinish={goToPreviewPage}
            autoComplete="off"
            className='container' >
            <MyInput
                fieldName='bank_name'
                errorData={errorData}
                inputProps={{
                    onChange: e => updateUserInfo({ ...userInfo, bank_name: e.target.value }),
                    value: userInfo?.bank_name || ''
                }}
                containerProps={{ className: 'mb-20px' }}
                title={'نام بانک : '} />
            <MyInput
                fieldName='iban'
                mandatory={'لطفا شماره شبا را وارد نمائید'}
                inputProps={{
                    onChange: e => updateUserInfo({ ...userInfo, iban: e.target.value }),
                    value: userInfo?.iban || ''
                }}
                title={'شماره شبا : '} />
            <Button className='w-100 mt-30px' htmlType='submit' type='primary'>ادامه</Button>
        </Form>
    )
}

export default BankInfo