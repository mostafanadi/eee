import {
    createBrowserRouter,
} from "react-router-dom";
import React from 'react'

import Home from "./../pages/Home";
import Info from "../pages/Info";
import Address from "./..//pages/Address";
import Preview from "./..//pages/Preview";
import BankInfo from "./../pages/BankInfo";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,

    },
    {
        path: "/info",
        element: <Info />,

    },
    {
        path: "/address",
        element: <Address />,
    },
    {
        path: "/bank",
        element: <BankInfo />,
    },
    {
        path: "/preview",
        element: <Preview />,
    }
]);