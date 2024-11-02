import { useSearchParams,useNavigate } from "react-router-dom";
import {useEffect} from 'react'
import {verifytData} from '../../axios/order/axios'
const Verify = () => {
    const [searchParams] = useSearchParams();
    console.log(searchParams)
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    console.log(success,orderId)
    const goBack = useNavigate();
    const backHome = () => {
        goBack("/")
    }
    const verifyPay = async () => {
        try{
  const response = await verifytData(success,orderId);
  console.log(response)
  if(response.data.success){
    backHome()
  }

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        verifyPay()

     return ;   
    },[])
if(success && orderId){
    return(
        <div>
            <h1>Order Placed Succesfully</h1>
        </div>
    )
}

}

export default Verify;