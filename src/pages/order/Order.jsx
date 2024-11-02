import styles from './order.module.css';
import {useFoodData} from '../../context/Store.jsx'
import {useState,useEffect} from 'react';
import {sendCartData} from '../../axios/order/axios.jsx'
const Order = () => {
    const data = useFoodData();
    const {token,cartItemsDisplay,cartList,foodList} = useFoodData();
    const [cartTotal,setCartTotal] = useState(null)
    const [deliveryData,setDeliveryData] = useState({'firstname':'','lastname':'','email':'','street':'','city':'','state':'','zipCode':'','country':''
        ,'phone':''
    })
    const onChangeDel = (event) => {
        
        const key = event.target.name;
        const value = event.target.value;
        setDeliveryData({...deliveryData,[key]:value})
    }
    useEffect(()=>{
        setCartTotal(data.cartTotal)
        return;
    },[data])
    const submitForm = async (event) => {
        event.preventDefault();
        let orderData = {
            address: deliveryData,
            items: cartItemsDisplay,
            amount: cartTotal.total,
        }
        try{
            const response = await sendCartData(orderData,token);
            console.log(response)
            if(response.data.success){
                const {session_url} = response.data;
                window.location.replace(response.data.session_url)
            }
        }catch(error){
            console.log(error)
        }
        
    }
    if(cartTotal){
        return(
            <section className={styles['order-div']}>
                <form onSubmit={submitForm}>
                <DeliveryInfo onChangeDel={onChangeDel} deliveryData={deliveryData} />
                <CartInfo cartTotal={cartTotal}/>
                </form>
            </section>
        )
    }

}

export default Order;

const DeliveryInfo = ({onChangeDel,deliveryData}) => {
    return(
        <div>     
            <h1>Delivery Information</h1>
            <div className={styles['input-div']}>
                <input type='text' name="firstname" placeholder='Enter Your First Name' value={deliveryData.firstname} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="lastname" placeholder='Enter Your LAst Name' value={deliveryData.lastname} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="email" placeholder='Enter Your Email' value={deliveryData.email} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="street" placeholder='Enter Your Street' value={deliveryData.street} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="city" placeholder='Enter Your City' value={deliveryData.city} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="state" placeholder='Enter Your State' value={deliveryData.state} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="zipCode" placeholder='Enter Your Zip Code' value={deliveryData.zipCode} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="country" placeholder='Enter Your Country' value={deliveryData.country} 
                onChange={()=>onChangeDel(event)} preventDefa/>
                <input type='text' name="phone" placeholder='Enter Your Phone Number' value={deliveryData.phone} 
                onChange={()=>onChangeDel(event)} preventDefa/>
            </div>
        </div>
 
    )
}

const CartInfo = ({cartTotal}) => {
    const {total,subtotal,delivery} = cartTotal;
    return(
        <div className={styles['cart-div']}>
            <h1>Cart Total</h1>
            <div className={styles['cart-details']}>
            <p><span className={styles['total-label']}>Subtotal</span><span className={styles['total-value']}>${subtotal}</span></p>
            <p><span className={styles['total-label']}>Delivery Fee</span><span className={styles['total-value']}>${subtotal ? delivery : 0 }</span></p>
            <p><span className={styles['total-label']}>Total</span><span className={styles['total-value']}>${subtotal ? total : 0 }</span></p>
            <div className={styles['submit-btn']}>
                <button type="submit">POCEED TO PAYMENT</button>
            </div>
            </div>
        </div>
    )
}