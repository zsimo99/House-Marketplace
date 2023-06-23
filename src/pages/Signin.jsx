import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import {toast} from "react-toastify"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import OAuth from "../components/OAuth"

function Signin() {
    const [showPassword,setShowPassword]=useState(false)
    const [formData,setFormData]=useState({email:"",password:""})
    
    const {email,password}=formData

    const navigate=useNavigate()

    const onChange=(e)=>{
        setFormData((prev=>({
            ...prev,[e.target.id]:e.target.value
        })))
    }

    const onSubmit=async(e)=>{
        e.preventDefault()
        try {
            const auth=getAuth()

            const userCredential=await signInWithEmailAndPassword(auth,email,password)

            if(userCredential.user){
                navigate("/")
                toast.success("welcome back")
                
            }
        } catch (error) {
            toast.error("Bad User Credentials")
        }
    }

    return (
      <>
          <div className="pageContainer">
            <header>
                <p className="pageHeader">Welcome Back</p>
            </header>
                <form onSubmit={onSubmit}>
                    <input type="email" placeholder="Email" className="emailInput" id="email" value={email} onChange={onChange} />
                    <div className="passwordInputDiv">
                        <input type={showPassword?"text":"password"} placeholder="Password" className="passwordInput" id="password" value={password} onChange={onChange}/>
                        <img src={visibilityIcon} className="showPassword" alt="show password" onClick={()=>setShowPassword((prev)=>!prev)}/>
                    </div>
                    <Link to="/forgotpassword" className="forgotPasswordLink">Forgot Password</Link>
                    <div className="signInBar">
                        <p className="signInText">Sign In</p>
                        <button className="signInButton">
                            <img src={arrowRight} alt="arrow"  />
                        </button>
                    </div>
                </form>
                <OAuth/>
                <Link to="/signup" className="registerLink">Sign Up Instead</Link>
          </div>
      </>
    )
  }
  
  export default Signin