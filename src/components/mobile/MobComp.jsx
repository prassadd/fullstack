import {useFoodData} from '../../context/Store';
import './mobile.css'
const MobileComp = () => {
    const data = useFoodData()
    return(
        
        <div className='mobile-container'>
            <h1>For Better Experience Download Tomato App</h1>
            <div className='app-icons'>
                <img src={data.icons.app_store} />
                <img src={data.icons.play_store} />
            </div>
        </div>
       
    )
}
export default MobileComp;