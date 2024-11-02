import axios from 'axios';

const apiRequest = axios.create({
    baseURL:"http://localhost:4000/api/cart/"
})

export const getCartData = async (token) => {
    const data = await apiRequest.post("/get",{},{
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    });
    return data;
}

export const addCartData = async (token,itemId) => {  
    const data = await apiRequest.post("/add",{itemId},{
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    });
    return data;
}


export const removeCartData = async (token,itemId) => {
    const data = await apiRequest.post("/remove",{itemId},{
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    });
    return data;
}
