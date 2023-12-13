import { createContext, useState } from "react";
import React from 'react'
import { IError } from "../../types";

export const initialErrorData: IError = {
    code: "validation_error",
    detail: "",
    extra: [{
        error: "",
        field: ""
    }],
    status: ""
}

export const errorContext = createContext<{ errorData: IError, updateErrorData: (errorData: IError) => void }>({
    errorData: initialErrorData,
    updateErrorData: () => undefined
})
interface Props {
    children: JSX.Element
}


const ErrorProvider = ({ children }: Props) => {
    const [errorData, setErrorData] = useState<IError>(initialErrorData);
    const updateErrorData = (newError: IError) => {
        setErrorData(newError);
    };

    return (
        <errorContext.Provider value={{ errorData, updateErrorData }}>
            {children}
        </errorContext.Provider>
    );
};
export default ErrorProvider