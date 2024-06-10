import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [amount, setAmount] = useState(500); 

  function razorpayPayment() {
    axios.post('http://127.0.0.1:8000/razorpay/order/create/', {
      amount: amount, 
      currency: "INR", 
    }).then((res) => {
      console.log(res)  
    })
  }

  return (
    <>
      <div className="container mt-5 w-25 rounded shadow p-5 bg-warning">
        <h1 className="text-center fw-bold">
          $500
        </h1>
        <p className="text-center">per year</p>
        <h3 className="font-semibold text-center">Basic</h3>
        <div className="mt-3 d-grid text-center">
          <button 
          onClick={() => razorpayPayment()}
          type="button" className="btn btn-light py-3 px-4 fw-semibold">Upgrade Now</button>
        </div>
      </div> 
    </>
  )
}

export default App
