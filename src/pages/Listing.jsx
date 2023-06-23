import { useState,useEffect } from "react"
import { useNavigate,Link,useParams } from "react-router-dom"
import { MapContainer,Marker,Popup,TileLayer } from "react-leaflet"
import {Swiper,SwiperSlide} from "swiper/react"
// import swiperCore ,{Navigation,Pagination,Scrollbar,A11y} from "swiper"
import { Navigation,Pagination} from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getDoc,doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import Spinner from "../components/Spinner"
import shareIcon from "../assets/svg/shareIcon.svg"
import { toast } from "react-toastify"


function Listing() {
    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(true)
    const [shareLinkCopied,setShareLinkCopied]=useState(false)

    const navigate =useNavigate()
    const params=useParams()
    const auth=getAuth()

    useEffect(()=>{
        const fetchListing=async()=>{
            const docRef=doc(db,"listing",params.listingId)
            const docSnap=await getDoc(docRef)

            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing()
    },[navigate,params.listingId])

    if(loading) return <Spinner/>
  return (
    <main>
        <Swiper  pagination={true} navigation={true} modules={[Pagination, Navigation]}  spaceBetween={50} slidesPerView={1}>
            {listing.imageUrls?.map((url,index)=>(
                <SwiperSlide key={index}>
                    <div className="swiperSlideDiv"  style={{background:`url(${url}) no-repeat center`,backgroundSize:"cover"}} ></div>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="shareIconDiv" onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
                setShareLinkCopied(false)
            }, 2000);
        }}>
            <img src={shareIcon} alt="share" />
        </div>
        {shareLinkCopied && <p className="linkCopied">Link Copied</p>}
        <div className="listingDetails">
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">For {listing.type==="rent"?"Rent":"Sale"}</p>
        {listing.offer && (
            <p className="discountPrice">${listing.regularPrice-listing.discountedPrice} discount</p>
        )}
        <ul className="listingDetailsList">
            <li>
                {listing.bedrooms>1?`${listing.bedrooms} Bedrooms`:"1 Dedroom"}
            </li>
            <li>
                {listing.bathrooms>1?`${listing.bathrooms} Bathrooms`:"1 Dathroom"}
            </li>
            <li>
                {listing.parking && "Parking Spot"}
            </li>
            <li>
                {listing.furnished && "Furnished"}
            </li>
        </ul>
        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
            <MapContainer style={{height:"100%",width:"100%"}} center={[listing.geolocation.lat,listing.geolocation.lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                />
                <Marker position={[listing.geolocation.lat,listing.geolocation.lng]}>
                    <Popup>{listing.location}</Popup>
                </Marker>
            </MapContainer>
            
        </div>
        {auth.currentUser?.uid !==listing.userRef && (
            <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">Contact Landlord</Link>
        )}
        </div>
    </main>
  )
}

export default Listing