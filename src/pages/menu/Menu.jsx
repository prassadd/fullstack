import ExploreMenu from '../../components/menu/ExoloreMenu.jsx'
import TopDishes from '../../components/menu/TopDishes.jsx'
import { useState } from 'react'
import './menu.css'
const Menu = () => {
    const [category,setCategory] = useState('All')
    return(
        <section className="menu-section">
                    <ExploreMenu category={category} setCategory={setCategory}/>
        <hr/>
        <TopDishes category={category}/>
        </section>
    )
}
export default Menu