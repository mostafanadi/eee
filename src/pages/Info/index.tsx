/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import MyInput from '../../components/MyInput'
import { userContext } from '../../store/StoreProvider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { errorContext } from '../../store/ErrorProvider'
import { Button, Form, Input, Radio } from 'antd'
import LegalInfo from '../../components/LegalInfo'
import PersonalInfo from '../../components/PesonalInfo'

const Info = () => {
    const { userInfo, updateUserInfo } = useContext(userContext);
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const navigate = useNavigate()

    useEffect(() => {
        if (!type) {
            navigate({
                search: 'type=personal'
            })
        }
        updateUserInfo({ ...userInfo, type: type as string })

    }, [type])



    return (
        <div className='container'>
            <Radio.Group className='mb-20px' onChange={e => {
                navigate({
                    search: `type=${e.target.value}`
                })
                if (e.target.value === 'personal') {
                    updateUserInfo({ ...userInfo, registration_number: "", tel: "" })
                } else {
                    updateUserInfo({ ...userInfo, national_code: "", phone: "" })

                }
            }} value={type} >
                <Radio value={'personal'}>حقیقی</Radio>
                <Radio value={'legal'}>حقوقی</Radio>
            </Radio.Group>
            {
                type === "personal" ? <PersonalInfo /> : <LegalInfo />
            }
        </div>
    )
}

export default Info