import { useState,useEffect } from "react"
import { getAuth ,updateProfile} from "firebase/auth"
import { updateDoc ,doc,collection,getDocs,query,where,orderBy,deleteDoc} from "firebase/firestore" 
import { db } from "../firebase.config"
import { useNavigate,Link} from "react-router-dom"
import { toast } from "react-toastify"
import homeIcons from "../assets/svg/homeIcon.svg"
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Profile() {
  
  const auth=getAuth()
  const [changeDetail,setChangeDetail]=useState(false)
  const [loading,setLoading]=useState(true)
  const [listings,setLestings]=useState(null)
  const [formData,setFormData]=useState({name:auth.currentUser.displayName,email:auth.currentUser.email})

  useEffect(()=>{
    const fetchListings=async()=>{
      const listingsRef=collection(db,"listing")
      const q=query(listingsRef,where("userRef","==",auth.currentUser.uid),orderBy("timestamp","desc"))

      const querySnap=await getDocs(q)
      let listings=[]

      querySnap.forEach(doc=>{
        return listings.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setLestings(listings)
      setLoading(false)
    }
    fetchListings()
  },[auth.currentUser.uid]) 

  const {name,email}=formData

  const navigate=useNavigate()

  const logOut=()=>{
    auth.signOut()
    navigate("/")
  }
  const onSubmit=async()=>{
   try {
    await updateProfile(auth.currentUser,{displayName:name})

    const userRef=doc(db,"users",auth.currentUser.uid)
    await updateDoc(userRef,{name})
    toast.success("done")
   } catch (error) {
    toast.error('could not update profile details')
   }

  }

  const onChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.id]:e.target.value}))
  }
  const onDelete=async(id)=>{
    if(window.confirm("are u sure u want to delete")){
      await deleteDoc(doc(db,"listing",id))
      const updatedListing=listings.filter(listing=>{
        return listing.id!==id
      })
      setLestings(updatedListing)
      toast.success("successfully deleted listing")
    }
  }
  const onEdit =(listingId)=> navigate(`/edit-listing/${listingId}`)
  if(loading) return <Spinner/>
    
  return (
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={logOut}>Log Out</button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Detail</p>
            <p style={{userSelect:"none"}} className="changePersonalDetails" onClick={()=>{
              changeDetail && onSubmit()
              setChangeDetail((prev)=>!prev)
            }}>
              {changeDetail ? "done" : "change"}
            </p>
          </div>

          <div className="profileCard">
            <form>
            <input type="text" id="name" className={changeDetail?"profileNameActive":"profileName"} disabled={!changeDetail} value={name} onChange={onChange}/>
            <input type="text" id="email" className={changeDetail?"profileEmailActive":"profileEmail"} disabled={!changeDetail} value={email} onChange={onChange}/>
            </form>
          </div>
          <Link className="createListing" to="/create-listing">
            <img src={homeIcons} alt="home" />
            <p>Sell or rent ur home</p>
            <img src={arrowRight} alt="arrow right"  />
          </Link>
          {!loading && listings?.length>0 && (
            <>
              <p className="listingText">Your Listings</p>
              <ul className="listingsList">
                {listings.map(({id,data})=>(
                  <ListingItem key={id} listing={data} id={id} onDelete={()=>onDelete(id) } onEdit={()=>onEdit(id)}/>
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    )
  }
  
  export default Profile