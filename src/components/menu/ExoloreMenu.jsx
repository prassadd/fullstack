import styles from './exploremenu.module.css'
import {useFoodData} from '../../context/Store.jsx';
const ExoloreMenu = ({category,setCategory}) => {
    const data = useFoodData();
    return(
        <section className={styles['explore-menu']}>
        <h1>Explore our menu</h1>
        <p>Explore our menu to discover a delightful array of dishes crafted with fresh ingredients and bold flavors. 
            From savory appetizers to mouthwatering entrees 
            and delectable desserts, there's something to satisfy every craving!</p>
        <ul className={styles['menu-list']}>
            {(data.menuList).map((element,index) => {
               return <MenuList element={element} key={index} className={styles['active']} category={category} setCategory={setCategory}/>;
            })}
            
        </ul>
    </section>
    )
}
export default ExoloreMenu;

const MenuList = ({element,className,category,setCategory}) => {
    const {menu_image,menu_name} = element;
    return(
        <li>
            <div>
            <img src={menu_image} className={category === menu_name ? className : ''} 
             onClick={()=>setCategory(category === menu_name ? 'All' : menu_name)}/>
            <p>{menu_name}</p>
            </div>
        </li>
    )
}