import styles from './topdishes.module.css'
import {useFoodData} from '../../context/Store.jsx';
import { useState,useEffect } from 'react';
import { IoIosStar,IoIosStarHalf  } from "react-icons/io";
const TopDishes = ({category}) => {
    const data = useFoodData();
    const [dataArr,setDataArr] = useState([]);
    const [showDataArr,setShowDataArr] = useState([]);
    const [loading,setLoading] = useState(true)
    const [cartList,setCartList] = useState([])

    useEffect(()=>{
        if(data.foodList){
            setDataArr(data.foodList)
            setCartList(data.cartList)
            if(data.foodList && data.cartList){
                const newFoodList = (data.foodList).map((element,indexVal)=>{
                    const foundElement = (data.cartList).find((cartEle,index) => element._id == cartEle.id)
                    return foundElement ? {...element,'qty':foundElement.qty} : element;
                }) 
                setDataArr(newFoodList)
            }
            setLoading(false)
        }
        return;
    },[data])
    useEffect(()=>{
        if(category!='All'){
            const newArr = dataArr.filter((element,index) => element.category === category)
            setShowDataArr(newArr)
        }else{
            setShowDataArr(dataArr)
        }
        return;
    },[dataArr,category])

    if(loading){
        return(
            <h1>Loading...Please Wait!</h1>
        )
    }
    if(showDataArr){
        return(
            <section className={styles["top-dishes"]}>
            <h1>Top Dishes near You</h1>
            <ul className={styles["dishes-list"]}>
                {(showDataArr).map((element,index) => {
                    return <Dishes element={element} key={element._id} setCartData={data.setCartData}/>
                })}
            </ul>
            </section>
        )
    }

}
export default TopDishes;

const Dishes = ({element,setCartData}) => {
    const {category,image,price,description,name,_id,qty} = element;
    return (
        <li className={`${styles[`dish_${_id}`]} ${styles[`dish`]}`} data-category={category}>
            <div>
                <img src={`http://localhost:4000/images/${image}`} />
                <div className={styles[`operation`]}>
                    {qty ?  <div className={styles[`inc-dec`]}>
                     <button className={styles[`decrement`]} operation='remove' onClick={()=>setCartData(event.target.getAttribute('operation'),_id)} >-</button>
                     <span className={styles[`count`]}>{qty}</span>
                     <button className={styles[`increment`]} operation='add' onClick={(event)=>setCartData(event.target.getAttribute('operation'),_id)} >+</button>
                     </div> : <button className={styles[`no-op`]} operation='addNew' onClick={(event)=>setCartData(event.target.getAttribute('operation'),_id,1)}>+</button> 
                    }
                </div>
            </div>
            <div  className={styles[`desc`]}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>{name}</h1><span><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStarHalf/></span>
                </div>
                <p>{description}</p> 
              <h1 className={styles[`dish-price`]}>${price}</h1>
            </div>
        </li>
    )
}