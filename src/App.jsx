import {RouterProvider,createBrowserRouter,Routes,Route} from 'react-router-dom';
import Contact from './pages/contact/Contact.jsx';
import Home from './pages/home/Home.jsx';
import Menu from './pages/menu/Menu.jsx';
import Mobile from './pages/mobileapp/Mobile.jsx';
import Layout from './layout/Layout.jsx';
import Cart from './pages/cart/Cart.jsx'
import Order from './pages/order/Order.jsx'
import Verify from './pages/verify/Verify.jsx'
import MyOrders from './pages/myorders/MyOrders.jsx'

const App = () => {
  const router = createBrowserRouter([{
    path:"",
    element:<Layout />,
    children:[
    {
      path:"/",
      element:<Home />
    },
    {
      path:"/mobile",
      element:<Mobile />
    },
    {
      path:"/menu",
      element:<Menu />
    },
    {
      path:"/contact",
      element:<Contact />
    },
    {
      path:"/cart",
      element:<Cart />
    },
    {
      path:"/order",
      element:<Order />
    },
    {
      path:"/verify",
      element:<Verify />
    },
    {
      path:"/myorders",
      element:<MyOrders />
    }
  ]
    
  }])
  return(
    <RouterProvider router={router} />
  )
}

export default App;

// const App = () => {

//   return(
//     <>
//     <Routes>
//     <Route path="/" element= {<Home/>}/>
//       <Route path="/contact" element={<Contact />} />
//     </Routes>
//     </>
//   )
// }

// export default App;