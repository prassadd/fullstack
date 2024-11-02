import {Outlet} from 'react-router-dom';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
    return(
        <>
            <Header />
            <ToastContainer />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;