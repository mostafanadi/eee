import React, { InputHTMLAttributes } from 'react'
import classes from './style.module.css'
import { Form, Input, InputProps } from 'antd'
import { IError } from '../../../types'
interface Props {
    title: string, inputProps: InputProps, containerProps?: InputHTMLAttributes<HTMLDivElement>, errorData?: IError, fieldName?: string, mandatory?: string
}

const MyInput = ({ title, inputProps, errorData, fieldName, mandatory }: Props) => {
    const hasError = ((errorData?.extra?.[0].field === fieldName && !!!inputProps.value))

    return (
        < >
            <div className={hasError ? classes.error : ''} >{title}</div>
            <div className='red-text font-sm'>{hasError && (errorData?.extra?.[0]?.error)}</div>

            <Form.Item
                valuePropName={fieldName}
                className=''
                name={fieldName}
                rules={[{ required: !!mandatory, message: mandatory }]}
            >

                <Input className={hasError ? classes.errorInput : ''} {...inputProps} />
            </Form.Item>
        </>
    )
}

export default MyInput