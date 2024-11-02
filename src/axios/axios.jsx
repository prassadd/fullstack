import axios from 'axios';

const apiRequest = axios.create({
    baseURL:"http://localhost:4000/api/food"
})

export const getData = async () => {
    const data = await apiRequest.get("/list");
    return data;
}