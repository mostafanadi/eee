import React, { createContext, useState } from "react";
import { IUserInfo } from "../../types";
const initialUserInfo: IUserInfo = {
    bank_name: "",
    city: "",
    first_name: "",
    iban: "",
    last_name: "",
    national_code: "",
    phone: "",
    province: "",
    registration_number: "",
    tel: "",
    type: ""

}
export const userContext = createContext<{ userInfo: IUserInfo, updateUserInfo: (userInfo: IUserInfo) => void }>({
    userInfo: initialUserInfo,
    updateUserInfo: () => undefined
})
interface Props {
    children: JSX.Element
}


const StoreProvider = ({ children }: Props) => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(initialUserInfo);
    const updateUserInfo = (newValue: IUserInfo) => {
        setUserInfo(newValue);
    };

    return (
        <userContext.Provider value={{ userInfo, updateUserInfo }}>
            {children}
        </userContext.Provider>
    );
};
export default StoreProvider