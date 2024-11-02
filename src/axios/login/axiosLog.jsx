import axios from 'axios'

const apiUrl = axios.create({
    baseURL:"http://localhost:4000/api/user/"
})

export const userLogin = async (data) => {
    const user = await apiUrl.post("/login",data);
    console.log(user)
    return user;
}

export const userSignUp = async (data) => {
    console.log('signup')
    const user = await apiUrl.post("/register",data);
    console.log(user)
    return user;
}