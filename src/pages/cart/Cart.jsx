import {useFoodData} from '../../context/Store.jsx'
import {useState,useEffect} from 'react';
import styles from './cart.module.css'
import { MdDelete } from "react-icons/md";
import { useNavigate} from 'react-router-dom'
const Cart = () => {
    const data = useFoodData();
    const [cartItems,setCartItems] = useState([])
    const [cartTotal,setCartTotal] = useState(null)
    const navigate = useNavigate();
    console.log(data)
    useEffect(()=>{
        setCartTotal(data.cartTotal)
        setCartItems(data.cartItemsDisplay)
        return;
    },[data])
    
    if(cartItems && cartTotal){
        return(
            <section className={styles['cart-section']}>
                <Item cartItems={cartItems} onClick={data.setCartData}/>
                <Total cartTotal={cartTotal} navigate={navigate}/>
            </section>
        )
    }

}
export default Cart;

const Item = ({cartItems,onClick}) => {
    return(
        <div className={styles['items']}>
            <table>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>          
                <tbody>
                    {cartItems.map((element,index)=>{
                        return (
                            <tr>
                                <td><img src={`http://localhost:4000/images/${element.image}`}/></td>
                                <td>{element.title}</td>
                                <td>{element.price}</td>
                                <td>{element.qty}</td>
                                <td>${element.total}</td>
                                <td><MdDelete onClick={()=>onClick('removeAll',element.id)}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}
const Total = ({cartTotal,navigate}) => {
const {total,subtotal,delivery} = cartTotal;
return(
    <section className={styles['invoice']}>
        <div className={styles['total-div']}>
            <h1>Cart Total</h1>
            <p><span className={styles['total-label']}>Subtotal</span><span className={styles['total-value']}>${subtotal}</span></p>
            <p><span className={styles['total-label']}>Delivery Fee</span><span className={styles['total-value']}>${subtotal ? delivery : 0 }</span></p>
            <p><span className={styles['total-label']}>Total</span><span className={styles['total-value']}>${subtotal ? total : 0 }</span></p>
            <button onClick={()=>navigate("/order")}>POCEED TO CHECKOUT</button>
        </div>
        <div className={styles['promo']}>
     
        <p>If you have a promo code,Enter here</p>
            <div className={styles['promo-ip']}><input type='text' placeholder='Promo Code'/>
            <button>Apply Code</button>
            </div>
            
 
        </div>
    </section>
)
}