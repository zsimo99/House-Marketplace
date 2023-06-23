import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Explore,ForgotPassword,Offer,Profile,Signin,Signup,Category,CreateListing,Listing, Contact,EditListing} from "./pages"
import Nvabar from "./components/Nvabar"
import PrivateRoute from "./components/PrivateRoute";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/category/:categoryName" element={<Category/>}/>
          <Route path="/offer" element={<Offer/>}/>
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
          <Route path="/Contact/:landlordId" element={<Contact/>}/>
          <Route path="/edit-listing/:listingId" element={<EditListing/>}/>
        </Routes>
        <Nvabar/>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
