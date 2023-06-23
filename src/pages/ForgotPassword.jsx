import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import arrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg"

function ForgotPassword() {
  const [email,setEmail]=useState("")

  const onSubmit=async(e)=>{
    e.preventDefault()
    try {
      const auth=getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success("Email Was Sent")
    } catch (error) {
      toast.error('Could Not Sent Reset Email')
    }
  }
  return (
    <div className="pageContainer">
      <header>
      <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <Link className="forgotPasswordLink" to="/signIn">Sign In</Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <img src={arrowRightIcon} style={{width:"34px",height:"34px"}} alt="" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword