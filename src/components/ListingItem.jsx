import { Link } from "react-router-dom"
import DeleteIcons from "../assets/svg/deleteIcon.svg"
import bedIcons from "../assets/svg/bedIcon.svg"
import editIcon from "../assets/svg/editIcon.svg"
import bathtubIcons from "../assets/svg/bathtubIcon.svg"

function ListingItem({listing,id,onDelete,onEdit}) {
  return (
    <li className="categoryListing">
        <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
            <img src={listing.imageUrls[0]} alt={listing.name} className="categoryListingImg" />
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">{listing.location}</p>
                <p className="categoryListingName">{listing.name}</p>
                <p className='categoryListingPrice'>
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcons} alt="bed" />
            <p className="categoryListingInfoText">
                {listing.bedrooms>1? `${listing.bedrooms} Bedrooms`:"1 Bedroom"}
            </p>
            <img src={bathtubIcons} alt="bed" />
            <p className="categoryListingInfoText">
                {listing.bathrooms>1? `${listing.bathrooms} Bathrooms`:"1 Bathroom"}
            </p>
          </div>
            </div>
        </Link>
        {onDelete && <img src={DeleteIcons} className="removeIcon" onClick={(()=>onDelete(listing.id,listing.name))}/>}
        {onEdit && <img src={editIcon} className="editIcon" onClick={()=>onEdit(id)}/>}
    </li>
  )
}

export default ListingItem