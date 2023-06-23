import {useNavigate,useLocation} from "react-router-dom"

// import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
// import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
// import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import {MdOutlineExplore,MdLocalOffer} from "react-icons/md"
import {CgProfile} from "react-icons/cg"

function Nvabar() {
    const navigate=useNavigate()
    const location=useLocation()

    const pathMatchRoute=(route)=>{
        if(route===location.pathname){
            return true
        }
    }

  return (
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={()=>navigate("/")}>
                    <MdOutlineExplore style={{fontSize:"36px",color:pathMatchRoute("/")?"#2c2c2C":"#8f8f8f"}}/>
                    <p className={pathMatchRoute("/")?"navbarListItemNameActive":"navbarListItemName"}>Explore</p>
                </li>
                <li className="navbarListItem" onClick={()=>navigate("/offer")}>
                    <MdLocalOffer style={{fontSize:"36px",color:pathMatchRoute("/offer")?"#2c2c2C":"#8f8f8f"}}/>
                    <p className={pathMatchRoute("/offer")?"navbarListItemNameActive":"navbarListItemName"}>Offers</p>
                </li>
                <li className="navbarListItem" onClick={()=>navigate("/profile")}>
                    <CgProfile style={{fontSize:"36px",color:pathMatchRoute("/profile")?"#2c2c2C":"#8f8f8f"}}/>
                    <p className={pathMatchRoute("/profile")?"navbarListItemNameActive":"navbarListItemName"}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Nvabar