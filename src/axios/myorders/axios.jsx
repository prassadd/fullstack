import axios from 'axios';
const apiCall = axios.create({
    baseURL:"http://localhost:4000/api/order/"
})

export const getMyOrders = async (token) => {
    const data = await apiCall.post("/userorders",{},{
        headers:{
            'Content-Type': 'application/json',
            "token":token
        }
    });
    return data;
}