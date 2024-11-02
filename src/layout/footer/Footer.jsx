
import {useFoodData} from '../../context/Store'
import { FaFacebook,FaLinkedin,FaInstagramSquare} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import styles from './footer.module.css'
const Footer = () => {
    const data = useFoodData()
    return(
        <footer>
            <div className={styles['footer-container']}>
                <div className={styles['footer-content']}>
                    <img src={data.icons.logo}/>
                    <p>Thank you for visiting our website! We are dedicated to providing you with the best products and services to meet your needs.
                         Your satisfaction is our top priority, and we appreciate your support. For any questions or feedback, please feel free to 
                         reach out to us. 
                    </p>
                    <div className={styles['social-media']}>
                        <FaFacebook />
                        <FaLinkedin />
                        <RiTwitterXFill />
                        <FaInstagramSquare />
                    </div>
                </div>
                <div className={styles['company-details']}>
                    <h1>COMPANY</h1>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                    </div>
                    <div className={styles['company-contact']}>
                        <h1>GET IN TOUCH</h1>
                        <p>+91-9964624109</p>
                        <p>contact@tomato.com</p>
                    </div>
            </div>
        </footer>
    )
}
export default Footer;