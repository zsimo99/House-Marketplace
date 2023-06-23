import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { getDocs, collection,query,orderBy,limit } from "firebase/firestore";

import {Swiper,SwiperSlide} from "swiper/react"
import { Navigation,Pagination} from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import Spinner from "./Spinner";

function Slider() {
    const [loading,setLoading]=useState(true)
    const [listings,setLestings]=useState(null)

    const navigate=useNavigate()

    useEffect(()=>{
        const fetchListings=async()=>{
            const listingsRef=collection(db,"listing")
            const q=query(listingsRef,orderBy("timestamp","desc"),limit(5))
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
    },[])
    if(loading) return <Spinner/>
    if(listings.length<1) return <></>
  return (
    <>
        <p className="exploreHeading">Recollended</p>
        <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]}  spaceBetween={50} slidesPerView={1}>
            {listings.map(({data,id})=>(
                <SwiperSlide style={{cursor:"pointer"}} key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
                    <div className="swiperSlideDiv2"  style={{background:`url(${data.imageUrls[0]}) no-repeat center`,backgroundSize:"cover"}} ></div>
                    <p className="swiperSlideText">{data.name}</p>
                    <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice}{data.type==="rent" && " / month"}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
  )
}

export default Slider