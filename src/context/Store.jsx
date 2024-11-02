import {createContext,useContext} from 'react';
import { food_list,assets,menu_list } from '../assets/frontend_assets/assets';
import {useState,useEffect} from 'react';
import {getData} from '../axios/axios.jsx'
import {userSignUp,userLogin} from '../axios/login/axiosLog.jsx'
import {getCartData,addCartData,removeCartData} from '../axios/cart/axios.jsx'
export const FoodStore = createContext();
const FoodItems = ({children}) => {
    const [cartList,setCartList] = useState([])
    const [category,setCategory] = useState('All')
    const [cartItemsDisplay,setCartItemsDisplay] = useState([])
    const [cartTotal,setCartTotal] = useState({'subtotal':0,'delivery':2,'total':0})
    const [token,setToken] = useState('')
    const [foodList,setFoodList] = useState('')

    // const foodList = food_list;
    const icons = assets;
    const menuList = menu_list;
    
    const setCartData = (operation,id,qty) => {
        var newCart;
        switch(operation){
            case 'addNew':
                case 'add':
                    console.log(1)
                const addNewData = async () => {
                    try{
                        const response = await addCartData(token,id);
                        if(response.data.success){
                            getCartList()
                        } 
                    }catch(error){
                        console.log(error)
                    }
                }
                addNewData()
            break;
            case 'removeAll':
                newCart = cartList.filter((element,index) => element.id !== id)
                console.log(newCart)
                setCartList(newCart);
            break;
            case 'remove':
                const removeData = async () => {
                    try{
                        const response = await removeCartData(token,id);
                        console.log(response) 
                        if(response.data.success){
                            getCartList()
                        } 
                    }catch(error){
                        console.log(error)
                    }
                }
                removeData()
            break;

            default:
            break;
        }
        
    }
    const getCartList = async () => {
        try{
            const response = await getCartData(token);
            console.log(response.data)

            if(response.data.success){
                const cartData = response.data.cartData;
                console.log(Object.entries(cartData))
                const resultArray = Object.entries(cartData)
    .filter(([id, qty]) => qty > 0) // Only keep entries where qty > 0
    .map(([id, qty]) => ({ id, qty }));
                setCartList(resultArray)
            }
        }catch(error){
            console.log(error)
        }

    }
    useEffect(()=>{
        getCartList()
        return;
    },[token])


    useEffect(()=>{
        const cartListNew = (cartList).map((element,index)=>{
            const foundItem = (foodList).find((foodElement,indexVal) => foodElement._id == element.id)
            if(foundItem){
                return {...element,'name':foundItem.name,
                    'price':foundItem.price,'image':foundItem.image,
                    'total':foundItem.price*element.qty
                }
            }
        })
        var accumulator;
        const newCartTotal = cartListNew.reduce((accumulator,element)=>{
            return accumulator + element.total
        },0)
        setCartTotal({...cartTotal,'subtotal':newCartTotal,'total':(newCartTotal+cartTotal.delivery)})
        setCartItemsDisplay(cartListNew)
        return;
    },[cartList])

    useEffect(()=>{
       if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
       }
        return;
    },[])

    useEffect(()=>{
        const getList = async () => {
            try{
                const response = await getData();
                if(response.data.success){
                    setFoodList(response.data.data)
                }
            }catch(error){
                console.log(error)
            }

        }
        getList()
        return;
    },[])

    const storeList = {
        foodList,icons,menuList,setCategory,category,setCartData,cartList,cartItemsDisplay,cartTotal,userLogin,userSignUp,setToken,token
    }
    return(
        <FoodStore.Provider value={storeList}>{children}</FoodStore.Provider>
    )
}

export default FoodItems;

export const useFoodData = () => {
    const data = useContext(FoodStore);
    if(!data){
        throw new Error('No data Available')
    }
    return data;
}