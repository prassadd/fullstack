import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import styles from './login.module.css';
import {useFoodData} from '../../context/Store.jsx';
import {  toast } from 'react-toastify';
const Login = ({showLogin,setShowLogin,showLoginPopup,setLogin}) => {
    const storeData = useFoodData()
    const [checkTerms,setCheckTerms] = useState(false);
    const [data,setData] = useState({'email':'','password':'','name':''})
    
    const handleChange = (event) => {
        const key = event.target.name;
        const val = event.target.value;
        setData({...data,[key]:val})
    }
    const submitFormData = async (event) => {
        event.preventDefault();
        if(showLogin){
            try{
                const response = await storeData.userLogin(data)
                console.log(response)
                if(response.data.success){
                    toast.success(response.data.message)
                    
                    storeData.setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                    setShowLogin(false)
                }else{
                    toast.error(response.data.message)
                }
                
            }catch(error){
                console.log(error)
            }
            
        }else{
            try{
                const response = await storeData.userSignUp(data)
                if(response.data.success){
                    toast.success("User Added")
                    storeData.setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                }else{
                    toast.error(response.data.message)
                }
            }catch(error){
                console.log(error)
            }
        
        }
        
        // const formData = new FormData();
        // formData.append('email',data.email)
        // formData.append('name',data.name)
        // formData.append('password',data.password)
        // const response = await storeData.userSignUp(data)
        // console.log(response)
    }
    return(
        <>
        <div className={styles['overlay']} style={{display : showLoginPopup ? 'block' : 'none'}} onClick={setLogin}></div>
        <div className={styles['login-popup']} style={{display : showLoginPopup ? 'flex' : 'none'}}>
            <div className={styles['login-header']}>
                <h1>{showLogin ? 'Log In' : 'Sign Up'}</h1>
                <IoClose onClick={setLogin}/>
            </div>
            <form onSubmit={submitFormData}>
                <div className={styles['inputs']}inputs>
                    <div style={{display: showLogin ? 'none' : 'grid'}}><label htmlFor="username">Username</label><input type='username' name="name" placeholder='Enter your Username'
                    onChange={(event)=>handleChange(event)} value={data.name}/></div>
                    <div><label htmlFor="email">Email</label><input type='email' name="email" placeholder='Enter your Email' onChange={(event)=>handleChange(event)}
                     value={data.email}/></div>
                    <div><label htmlFor="password">Pasword</label><input type='password' name="password" placeholder='Enter your Password'
                    onChange={(event)=>handleChange(event)} value={data.password}/></div>
                </div>
                <div className={styles['check-terms']}><input type='checkbox' onChange={()=>setCheckTerms(!checkTerms)}/><p>Agree Terms and Conditions</p></div>
                <div className={styles['submit-btn']}>
                    <button type="submit" disabled= {checkTerms ? false : true}>{showLogin ? 'Log In' : 'Sign Up'}</button>
                </div>
                <p style={{margin:'0',display: showLogin ? 'unset' : 'none',cursor:'pointer'}}>Forgot Password?</p>
                <div style={{margin:'auto'}}>
                    {showLogin ? <p>Not a Member ? <span  onClick={()=>setShowLogin(!showLogin)} 
                    style={{cursor:'pointer',textDecoration:'underline',color:'blue'}}>Sign Up</span></p>
                      :  <p>Already a Member ? <span  onClick={()=>setShowLogin(!showLogin)} 
                      style={{cursor:'pointer',textDecoration:'underline',color:'blue'}}> Log In</span></p>}
                </div>
            </form>
        </div>
        </>
    )
}
export default Login;