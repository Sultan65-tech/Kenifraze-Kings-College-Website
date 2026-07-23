import React,{useState} from 'react'
import {PaystackButton} from "react-paystack"
const paystack = () => {
    const public_key = "Test"
    
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [amount,setAmount] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
  return (
    <div>
    <h1>Make your Payment</h1>

    </div>
  )
}

export default paystack
