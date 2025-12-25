import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import {getAuth,createUserWithEmailAndPassword,updateProfile} from "firebase/auth"
import {db} from "../firebase.config"
import {setDoc,doc,serverTimestamp} from "firebase/firestore"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import { toast } from "react-toastify"
import OAuth from "../components/OAuth"

function Signup() {
    const [showPassword,setShowPassword]=useState(false)
    const [formData,setFormData]=useState({email:"",password:"",name:""})
    
    const {name,email,password}=formData

    const navigate=useNavigate()

    const onChange=(e)=>{
        setFormData((prev=>({
            ...prev,[e.target.id]:e.target.value
        })))
    }

    const onSubmit=async(e)=>{
      e.preventDefault()
      try {
        console.log("sub")
        const auth=getAuth()
        const userCredential=await createUserWithEmailAndPassword(auth,email,password)
        const user =userCredential.user
        updateProfile(auth.currentUser,{displayName:name})

        const formDataCopy={...formData}
        delete formDataCopy.password
        formDataCopy.timestamp=serverTimestamp()

        await setDoc(doc(db,"users",user.uid),formDataCopy)

        navigate("/")
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    return (
      <>
          <div className="pageContainer">
            <header>
                <p className="pageHeader">Welcome Back</p>
            </header>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Name" className="nameInput" id="name" value={name} onChange={onChange} />
                    <input type="email" placeholder="Email" className="emailInput" id="email" value={email} onChange={onChange} />
                    <div className="passwordInputDiv">
                        <input type={showPassword?"text":"password"} placeholder="Password" className="passwordInput" id="password" value={password} onChange={onChange}/>
                        <img src={visibilityIcon} className="showPassword" alt="show password" onClick={()=>setShowPassword((prev)=>!prev)}/>
                    </div>
                    <Link to="/forgotpassword" className="forgotPasswordLink">Forgot Password</Link>
                    <div className="signUpBar">
                        <p className="signUpText">Sign In</p>
                        <button className="signUpButton">
                            <img src={arrowRight} alt="arrow"  />
                        </button>
                    </div>
                </form>
                <OAuth/>
                <Link to="/signin" className="registerLink">Sign In Instead</Link>
          </div>
      </>
    )
  }
  
  export default Signup