import { useEffect,useState } from "react"
import { collection,getDocs,query,where,orderBy,limit,startAfter } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { useParams } from "react-router-dom"
import ListingItem from "../components/ListingItem"



function Offer() {
    const [Listing,setListing]=useState(null)
    const [loading,setLoading]=useState(true)
    const [lastFetchedListing,setLastFetchedListing]=useState(null)
    

    const params=useParams()

    useEffect(()=>{
      const fetchListing=async()=>{
        
        try {
          
          const listingRef=collection(db,"listing")

        const q=query(
          listingRef,
          where("offer","==",true),
          orderBy("timestamp","desc"),
          limit(10)
        )
        const querySnap=await getDocs(q)
        const lastVisivle=querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisivle)

        
        const listing=[]
        
        querySnap.forEach((doc)=>{ 
          return listing.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setListing(listing)
        setLoading(false)
        } catch (error) {
          toast.error("could not fetch listings")
        }
      }
      fetchListing()
    },[params.categoryName])
    // load More 
    const onFetchMoreListing=async()=>{
        
      try {
        
        const listingRef=collection(db,"listing")

      const q=query(
        listingRef,
        where("offer","==",true),
        orderBy("timestamp","desc"),
        startAfter(lastFetchedListing),
        limit(10)
      )
      const querySnap=await getDocs(q)
      const lastVisivle=querySnap.docs[querySnap.docs.length-1]
      setLastFetchedListing(lastVisivle)

      
      const listing=[]
      
      querySnap.forEach((doc)=>{ 
        return listing.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setListing((prev)=>[...prev,...listing])
      setLoading(false)
      } catch (error) {
        toast.error("could not fetch listings")
      }
    }
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading?<Spinner/>: Listing && Listing.length>0?
      <>
        <main>
          <ul className="categoryListings">
            {Listing.map(listing=>{
              return <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
            })}
          </ul>
        </main>
        <br />
        <br />
        {lastFetchedListing && (
          <p className="loadMore" onClick={onFetchMoreListing}>Show More</p>
        )}
      </>:<p>There Are No Current Offers</p>}
    </div>
  )
}

export default Offer