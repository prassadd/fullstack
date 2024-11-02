import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import FoodItems from './context/Store.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <FoodItems>
    <App />
  </FoodItems>,
  </StrictMode>,
)
