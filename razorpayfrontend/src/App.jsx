import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import useRazorpay from 'react-razorpay'

function App() {
  const [amount, setAmount] = useState(500); 
  const [Razorpay] = useRazorpay(); 

  function razorpayPayment() {
    axios.post('http://127.0.0.1:8000/razorpay/order/create/', {
      amount: amount, 
      currency: "INR", 
    }).then((res) => {
      console.log(res)  
      const orderId = res.data.data.id; 
      const options = {
        key: "your razor pay secret key",
        name: "ZaymApp",
        description: "Premium payment",
        image: "https://example.com/your_logo",
        order_id: orderId,
        handler: (res) => {
          console.log(res); 
          completePayment(res.razorpay_payment_id, res.razorpay_order_id, res.razorpay_signature); 
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzpay = new Razorpay(options);
      rzpay.open();
    })
  }

  function completePayment (payment_id, order_id, signature) {
    axios.post('http://127.0.0.1:8000/razorpay/order/complete/', {
      payment_id, 
      order_id, 
      signature,
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
