import {NavLink,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { FaUser,FaCartArrowDown,FaSearch   } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from './header.module.css';
import {assets} from '../../assets/frontend_assets/assets';
import Login from '../../components/login/Login'
import {useFoodData} from '../../context/Store.jsx';
// import Cart from '../../pages/cart/Cart.jsx'
const Header = () => {
    const [showLoginPopup,setShowLoginPopup] = useState(false)
    const [showNavList,setshowNavList] = useState(true)
    const [showLogin,setShowLogin] = useState(true)
    const {token,setToken} = useFoodData();
    const navigate = useNavigate();
   
    const setLogin = () => {
        setShowLoginPopup(!showLoginPopup)
    }
    const logOut = (event)=>{
        localStorage.removeItem("token")
        setToken('')
        navigate("/")
    }
    return(
        <>
        <header>
        <section className={styles['header-section']}>
        <img className={styles['logo']} src={assets.logo} height={'50%'}/>
            <div className={styles['nav-div']}>
                <ul className={showNavList ? styles['nav-list-bg']: styles['nav-list-sm']}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
                    <li><NavLink to="/menu" className={({ isActive }) => isActive ? styles.active : ''}>Menu</NavLink></li>
                    <li><NavLink to="/mobile"className={({ isActive }) => isActive ? styles.active : ''}>Mobile App</NavLink></li>
                    {/* <li><NavLink to="/contact" onClick={()=>setshowNavList(!showNavList)}>Contact US</NavLink></li> */}
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''}>Contact US</NavLink></li>
                </ul>
            </div>
            <div className={styles['side-bar']}>
            <span className={styles['search']}><FaSearch  /></span>
            <NavLink to="/cart"><span className={styles['cart']}><FaCartArrowDown  /></span></NavLink>
            {!token? <span className={styles['user']} onClick={setLogin}><FaUser /><span className={styles['user-text']}>Sign In </span></span>
            : <div className={styles['navbar-profile']}>
                <img src={assets.profile_icon} />
                <ul className={styles['nav-profile-dropdown']}>
                    <li><NavLink to="/myorders"><img src={assets.bag_icon} />Orders</NavLink></li>
                    <li onClick={logOut}><img src={assets.logout_icon} />Log Out</li>
                </ul>
                </div> }
            
            <span className={styles['hamb']} onClick={()=>setshowNavList(!showNavList)}><GiHamburgerMenu/></span>
            </div>
        </section>
        </header>
        <Login showLoginPopup={showLoginPopup} showLogin={showLogin} setShowLogin={setShowLogin} setLogin={setLogin}/>
        </>
    )
}
export default Header;