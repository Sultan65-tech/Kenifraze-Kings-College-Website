import React, { useEffect, useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from "../Components/Loader"
// Styles
import  "../styles/verify.css"
const VerifyDonation = () => {
    const [searchparams] = useSearchParams();
    const [status,setStatus] = useState("Verifying payment please wait....");
    const [references,setReferences] = useState("")
    const [donation,setDonation] = useState(null)
    const [amount,setAmount] = useState("null")
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    // Extract refrence number from paystack
    
    const reference =searchparams.get("reference") || searchparams.get("trxref");
    useEffect(()=>{
        const verifyPayment = async()=>{
            if (!reference) {
                setReferences("No  reference Number Found");
                setLoading(false)
                return;
            }

            try {
                // Call Backend in order to update status
                const APicalls = await axios.get(`http://localhost:5000/api/payment/donate/verify/${reference}`);
                setDonation(APicalls.data.donation)
                console.log(donation);
                console.log(APicalls.status);
                setAmount(APicalls.amount)
                if (APicalls.status === 200) {
                    setStatus("Payment Verified Successfully.Thanks for your Donation")
                   setTimeout(()=>{ navigate("/")},4000)
                }else if(APicalls.status(404)){
                    setStatus("Failed")
                }
            } catch (error) {
                console.error(`Error making donation ${error}`)
                setStatus(error.response?.data?.error || "Verification")
            }finally{
                setLoading(false)
            }
        }
        verifyPayment()
    },[reference])
  return (
    <>
   {/* <div className="verify">
     <h2>"{status}"</h2>
   " {loading && <Loader/>}"
   </div> */}

        <div className="bodyContainer">
            <div className="successCard">
                
                {/* Fixed broken SVG path string from original file */}
                <div className="iconContainer">
                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>

                <h1 className="successTitle">Payment Successful!</h1>
                <p className="successSubtitle">
                    Thank you for your donation. Your transaction has been completed and a receipt was sent to your email.
                </p>

                {/* Invoice Breakdown Details Grid */}
                <div className="receiptPanel">
                    <div className="receiptRow">
                        <span className="label">Payment Status</span>
                        <span className="value" style={{ color: '#10b981' }}>{status}</span>
                    </div>
                    <div className="receiptRow">
                        <span className="label">Transaction ID</span>
                        <span className="value">{references}</span>
                    </div>
                    <div className="receiptRow">
                        <span className="label">Payment Gateway</span>
                        <span className="value">Paystack Secure</span>
                    </div>
                    <div className="receiptRow">
                        <span className="label">Amount Paid</span>
                        <span className="value">{amount}</span>
                    </div>
                </div>

                {/* Action Button Navigation Clusters */}
                <div className="btnGroup">
                    <Link to="/" className="btnPrimary">Go Back Home</Link>
                    <button onClick={() => window.print()} 
                        className="btnSecondary">
                        Print Payment Confirmation
                    </button>
                </div>
            </div>
        </div>
   
    </>
  )
}

export default VerifyDonation