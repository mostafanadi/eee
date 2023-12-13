import "./App.css";
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./router";
import StoreProvider from "./store/StoreProvider";
import ErrorProvider from "./store/ErrorProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {


  return (
    <div dir="rtl">
      <ToastContainer />
      <ErrorProvider>
        <StoreProvider >
          <RouterProvider router={router} />
        </StoreProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
