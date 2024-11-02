import axios from 'axios'

const apiCall = axios.create({
    baseURL:"http://localhost:4000/api/order"
})

export const sendCartData = async (cartData,token) => {
    console.log(cartData,token)
    const data = apiCall.post("/place",cartData,{
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    })
    return data;
}

export const verifytData = async (success,orderId,token) => {
    const data = apiCall.post("/verify",{success,orderId}
    )
    return data;
}