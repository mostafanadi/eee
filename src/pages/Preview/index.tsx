import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import classes from './style.module.css'
import { Button, Form } from 'antd';
import { toast } from 'react-toastify';
import { errorContext, initialErrorData } from '../../store/ErrorProvider';
import { userContext } from '../../store/StoreProvider';
import { useMutation } from '../../hooks/useMutation';

const Preview = () => {
    const { userInfo } = useContext(userContext);
    const { updateErrorData } = useContext(errorContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo?.type) {
            navigate('/info')
        }
    }, [userInfo])
    const submit = useMutation<{ status: string; detail: string }>({
        url: '/api/submit',
        options: {
            headers: {
                "Content-Type": "application/json"
            }
        }
    })


    if (submit?.data?.status === 'failed') {
        const error: any = submit?.data;
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
    } else if (submit?.data?.detail) {
            toast.success('فرم با موفقیت ذخیره شد')
            updateErrorData(initialErrorData)
    } 



    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit.postData(JSON.stringify({
            ...userInfo,
            city: userInfo?.city ? JSON.parse?.(userInfo?.city).id : "",
            province: userInfo?.province ? JSON?.parse?.(userInfo?.province).id : ""
        }))
    // setReqBody(JSON.stringify({
    //     ...userInfo,
    //     city: userInfo?.city ? JSON.parse?.(userInfo?.city).id : "",
    //     province: userInfo?.province ? JSON?.parse?.(userInfo?.province).id : ""
    // }))




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