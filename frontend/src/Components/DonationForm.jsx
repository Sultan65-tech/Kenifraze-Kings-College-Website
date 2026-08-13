import React from 'react'
import axios from "axios"
import { useState } from 'react'
// Styles
import  "../styles/donation.css"
const DonationForm = () => {
        // Payment Data
    const[formdata,setFormData] = useState({
        donorfName:"",
        donorlName:"",
        email:"",
        amount:"",
    })
    const [loading,setLoading] = useState(false)
   
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formdata,[e.target.name]: e.target.value})
    
    };
     const handleDonate = async (e) =>{
        e.preventDefault();
        setLoading(true);

    try {
        const payload = {

        }
        // Call the payment API
        const response =  await axios.post("http://localhost:5000/api/payment/donate/initialize",formdata);
        const {authorization_url,reference} = response.data;
   
        //  Redirect User to Checkout Page
        window.location.href=authorization_url;

    } catch (error) {
        console.error("Initializing error",error);
        alert(error.response?.data?.error || "Failed to initialize payment")
    }finally{
        setLoading(false)
    }
};
  return (
   <>
    <section id="kkcf-donate-form-section" className="kkcf-section-donation">
            <div className="kkcf-container">
                <div className="kkcf-form-box">
                    <h3 className="kkcf-form-title">Be the Reason a Child Never Gives Up</h3>
                    <p className="kkcf-form-subtitle">Secure Custom Donation Checkout</p>
                    
                    <form id="kkcfCheckoutForm" onSubmit={handleDonate}>
                        <div className="kkcf-form-group">
                            <label className="kkcf-form-label">Gift Amount ($ USD)</label>
                            <div className="kkcf-input-wrapper">
                                <span className="kkcf-input-icon">$</span>
                                <input type="number" name="amount" value={formdata.amount} onChange={handleChange} id="kkcfInputAmount"  className="kkcf-input-amount"/>
                            </div>
                        </div>

                        <div className="kkcf-form-row kkcf-form-group">
                            <div>
                                <label className="kkcf-form-label">First Name</label>
                                <input type="text" name="donorfName" value={formdata.donorfName} onChange={handleChange} className="kkcf-input-text"/>
                            </div>
                            <div>
                                <label className="kkcf-form-label">Last Name</label>
                                <input type="text" name="donorlName" value={formdata.donorlName} onChange={handleChange} className="kkcf-input-text"/>
                            </div>
                        </div>

                        <div className="kkcf-form-group">
                            <label className="kkcf-form-label">Email Address</label>
                            <input type="email" className="kkcf-input-text" value={formdata.email} onChange={handleChange} name="email" placeholder="you@example.com"/>
                        </div>

                        <button type="submit" className="kkcf-btn-submit">{loading ? "Initializing.." : "Proceed to Pay"}</button>
                        
                        <div className="kkcf-secure-tag">
                            <i className="fa-solid fa-lock text-green-500"></i> Secure context enabled.
                        </div>
                    </form>
                </div>
</div>
</section>
            
   
   </>
  )
}

export default DonationForm