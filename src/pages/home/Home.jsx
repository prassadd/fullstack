import {NavLink} from 'react-router-dom'
import { useState } from 'react'
import styles from './home.module.css'
import MobileComp from '../../components/mobile/MobComp'
import ExploreMenu from '../../components/menu/ExoloreMenu.jsx'
import TopDishes from '../../components/menu/TopDishes.jsx'
import {useFoodData} from '../../context/Store.jsx';

const Home = () => {
    
    const data = useFoodData()
    return(
        <section className={styles["home-section"]}>
            <div className={styles['hero-section']}>
                <div className={styles['hero-content']}>
                    <h1>Order your favourite food here</h1>
                    <p>Ordering food has never been easier! Whether you're craving a quick snack or a full meal, just browse the menu, make 
                        your selection, and place your order in minutes. Enjoy your favorite dishes delivered right to your door, 
                        hassle-free!</p>
                    <button className={styles['view-menu']}><NavLink to="/menu">View Menu</NavLink></button>
                </div>
            </div>
        <ExploreMenu category={data.category} setCategory={data.setCategory}/>
        <hr/>
        <TopDishes category={data.category}/>
        <MobileComp />
        </section>
    )
}
export default Home

