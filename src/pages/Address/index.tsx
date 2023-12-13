import React, { useContext, useEffect, useState } from 'react'
import classes from './style.module.css'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Select } from 'antd';
import { userContext } from '../../store/StoreProvider';
import { TCity, TProvince } from '../../../types';
import { errorContext } from '../../store/ErrorProvider';
import { useFetch } from '../../hooks/useFetch';

const Address = () => {
  const { userInfo, updateUserInfo } = useContext(userContext);
  const { errorData } = useContext(errorContext);
  const [provinceId, setProvinceId] = useState<number | null>(null)
  const navigate = useNavigate()

  const fetchedProvinces = useFetch<{ results: TProvince[] }>({
    url: '/api/provinces'
  })

  const FetchedCities = (id: number) => {
    return useFetch<{ results: TCity[] }>({
      url: `/api/cities/${id}`
    })
  }
  const cities = FetchedCities(provinceId as number)




  useEffect(() => {
    if (!userInfo?.type) {
      navigate('/info')
    }
  }, [userInfo])

  const doesCityHaveError = () => {
    return errorData?.extra?.[0].field === 'city' && !!!userInfo.city
  }
  const doesProvinceHaveError = () => {
    return errorData?.extra?.[0].field === 'province' && !!!userInfo.province
  }

  const gotoBankInfo = () => navigate('/bank')
  return (
    <Form className='container' onSubmitCapture={gotoBankInfo}>
      <div className={classes.select}>
        <div className={doesProvinceHaveError() ? 'red-text mb-8px' : 'mb-8px'}>استان : </div>
        <Select
          value={userInfo?.province ? JSON?.parse?.(userInfo?.province)?.name : undefined}
          className='w-100'
          status={doesProvinceHaveError() ? 'error' : undefined}
          placeholder='لطفا انتخاب کنید'
          options={fetchedProvinces.data?.results?.map((item) => {
            return (
              {
                value: JSON.stringify(item),
                label: item.name
              }
            )
          })}

          onChange={async province => {
            updateUserInfo({ ...userInfo, province, city: "" })
            setProvinceId(JSON.parse(province).id)
            // await fetchCities(JSON.parse(province).id)
          }} >


        </Select>
        <div className='red-text '>&#160; {doesProvinceHaveError() ? errorData?.extra?.[0].error : ''}</div>
      </div>
      <div className={classes.select}>
        <div className={doesCityHaveError() ? 'red-text mb-8px' : 'mb-8px'}>شهر : </div>
        <Select
          value={userInfo?.city ? JSON?.parse?.(userInfo?.city)?.name : undefined}

          status={doesCityHaveError() ? 'error' : undefined}
          placeholder='لطفا انتخاب کنید'
          className='w-100'

          onChange={city => updateUserInfo({ ...userInfo, city })}
          options={cities.data?.results?.map((item) => {
            return (
              {
                value: JSON.stringify(item),
                label: item.name
              }
            )
          })}
        >

        </Select>
        <div className='red-text'>&#160; {doesCityHaveError() ? errorData?.extra?.[0].error : ''}</div>
      </div>

      <Button className='w-100 mt-30px' type='primary' htmlType='submit'>ادامه </Button>

    </Form>
  )
}

export default Address