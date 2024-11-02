import { useState,useEffect } from 'react'
import {getMyOrders} from '../../axios/myorders/axios'
import {useFoodData} from '../../context/Store.jsx';
const MyOrders = () => {
    const [dataArr,setDataArr] = useState([]);
    console.log(dataArr)
    const {token} = useFoodData();
    useEffect(()=>{
        const getOrders = async () => {
            try{
                const response = await getMyOrders(token);
                if(response.data.success){
                    setDataArr(response.data.data)
                }
            }catch(error){
                console.log(error)
            }
        }
        getOrders()
        return;
    },[token])

    return(
        <div className="my-odrers">
            <div className='order-list'>
                <ul>
                    {dataArr.map((element,index)=>{
                       if(element.payment) { 
                        return  (element.items).map((order,ordIndex)=>{
                            return <li key={order._id} style={{display:'flex'}}>
                            <p>{order.name}</p>
                            <p>{element.status}</p>
                            </li>   
                        })
                    }else{
                        return null;
                    }
                       
                            
                        
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MyOrders;