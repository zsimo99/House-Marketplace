import { useNavigate,useLocation } from "react-router-dom"
import { getAuth,signInWithPopup,GoogleAuthProvider } from "firebase/auth"
import {doc,getDoc,serverTimestamp,setDoc} from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import googleIcon from "../assets/svg/googleIcon.svg"


function OAuth() {
    const navigate=useNavigate()
    const location=useLocation()

    const onGoogleClick=async()=>{
        try {
            const auth=getAuth()
            const provider=new GoogleAuthProvider()
            const result=await signInWithPopup(auth,provider)
            const user=result.user

            const docRef=doc(db,"users",user.uid)
            const docSnap=await getDoc(docRef)

            console.log(docSnap)

            if(!docSnap.exists()){
                await setDoc(doc(db,"users",user.uid),{
                    name:user.displayName,
                    email:user.email,
                    timestamp: serverTimestamp()
                })
                toast.success("Welcome")
            }else{
                toast.success("Welcome Back")
            }
            navigate("/")
        } catch (error) {
            toast.error("Could Not Authorize With Google")
        }
    }

  return (
    <div className="socialLogin">
        <p>Sign {location.pathname==="/signin"?"In":"Up"} With</p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <img className="socialIconImg" src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default OAuth