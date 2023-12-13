import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import classes from './style.module.css'
import { Button, Form } from 'antd';
import { toast } from 'react-toastify';
import { errorContext, initialErrorData } from '../../store/ErrorProvider';
import { userContext } from '../../store/StoreProvider';

const Preview = () => {
    const { userInfo } = useContext(userContext);
    const { updateErrorData } = useContext(errorContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo?.type) {
            navigate('/info')
        }
    }, [userInfo])

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const city = userInfo?.city ? JSON.parse?.(userInfo?.city).id : ""
        const province = userInfo?.province ? JSON?.parse?.(userInfo?.province).id : ""
        const data = await (await fetch('/api/submit', {
            method: 'POST',
            body: JSON?.stringify({ ...userInfo, city, province }),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json()
        if (data.status === 'failed') {
            const error = data;
            updateErrorData(error)
            if (error.detail === 'info') {

                navigate(`/info?type=${userInfo.type}`)
            }
            if (error.detail === 'address') {

                navigate(`/address?type=${userInfo.type}`)
            }
            if (error.detail === 'bank') {
                navigate(`/bank?type=${userInfo.type}`)
            }

        } else {
            toast.success('فرم با موفقیت ذخیره شد')
            updateErrorData(initialErrorData)
        }



    }
    return (
        <Form onSubmitCapture={submitForm} className='container'>
            <div
                className={classes.formContainer}>
                <span>نوع : </span>
                <span>{userInfo?.type === 'personal' ? 'حقیقی' : userInfo?.type === 'legal' ? 'حقوقی' : '-'}</span>
                <span>نام و نام خانوادگی : </span>
                <span>
                    <span className=' mx-10px d-inline-block' >{userInfo?.first_name || '-'}</span>
                    <span className='mx-10px d-inline-block'>{userInfo?.last_name || '-'}</span>
                </span>

                {
                    userInfo?.type === 'legal' &&
                    <>
                        <span>شماره ثبت : </span>
                        <span>{userInfo?.registration_number || '-'}</span>
                        <span>تلفن ثابت : </span>
                        <span>{userInfo?.tel || '-'}</span>
                    </>
                }
                {
                    userInfo?.type === 'personal' &&
                    <>
                        <span>کدملی : </span>
                        <span>{userInfo?.national_code || '-'}</span>
                        <span>تلفن همراه : </span>
                        <span>{userInfo?.phone || '-'}</span>
                    </>
                }
                <span>استان : </span><span>{userInfo?.province ? JSON?.parse?.(userInfo?.province)?.name : '-'}</span>
                <span>شهر : </span><span>{userInfo?.city ? JSON?.parse?.(userInfo?.city)?.name : '-'}</span>
                <span>نام بانک : </span><span>{userInfo?.bank_name || '-'}</span>
                <span>شماره شبا : </span><span>{userInfo?.iban || '-'}</span>
            </div>
            <Button className='w-100' type='primary' htmlType="submit">ثبت </Button>
        </Form>
    )
}

export default Preview