import './left-navigation.css'
import Grid from "react-loading-icons/dist/components/grid"
import { UseAppContext } from "../../Contexts/app-context"
import { Link } from "react-router-dom"
import { FaHome, FaUserAlt, FaImages, FaExclamationCircle, FaPeopleArrows, FaUserFriends,
    FaEnvelope} from 'react-icons/fa'

const LeftNavigation = ()=>{
    const {loggedIn, loading, setLazyLoading, lazyLoading, currentUser,timelineposts, allUsers, postcreated, 
        setPostCreated, currentUserParsed, fetchedUser} = UseAppContext()
    const {_id : userId, username : userUsername, followings, followers, 
        profilePicture : userProfilePicture, coverPicture : userCoverPicture} = fetchedUser
    const {_id , username, firstname, lastname} = currentUserParsed

    let firstnameCapitalized = '';
    let lastnameCapitalized = ''
    if(firstname){
        firstnameCapitalized = firstname.slice(0,1).toUpperCase().concat(firstname.slice(1).toLowerCase())
    }

    if(lastname){
        lastnameCapitalized = lastname.slice(0,1).toUpperCase().concat(lastname.slice(1).toLowerCase())
    }


    return   <div className='page-left-inner' >
        <ul className='homepage-left-ul' >
            <li className='homepage-left-li'>
            <Link to={`/userprofile/${_id}/${username}`} className='left-nav'>
            <div  className='left-nav-inner'> <FaUserAlt /> {`${firstnameCapitalized} ${lastnameCapitalized}`}</div>
            </Link>
            </li>
            <li className='homepage-left-li'>
              <Link to="/" className="left-nav" >
                <div className= {window.location.pathname == '/' ? `left-nav-inner-active` :`left-nav-inner` }
                ><FaHome />  Home</div>
            </Link>
            </li>
            <li className='homepage-left-li'>
              <Link to={`/connections/${_id}/${username}`}  className="left-nav" >
                <div className= {window.location.href.indexOf("connections") > -1 ? `left-nav-inner-active` :`left-nav-inner` }
                ><FaPeopleArrows />  Connections</div>
            </Link>
            </li>
            <li className='homepage-left-li'>              
                <Link to={`/follows/${_id}/${username}`} className="left-nav">
                <div className= {window.location.href.indexOf("follows") > -1 ? `left-nav-inner-active` :`left-nav-inner` }>
                <FaUserFriends />  Follows</div>
                </Link>
            </li>
            <li className='homepage-left-li'>
            <Link to='/inbox' className="left-nav">
            <div  className= {window.location.href.indexOf("chat") > -1 ||
            window.location.href.indexOf("inbox") > -1 || 
            window.location.href.indexOf("composemessage") > -1 ?
             `left-nav-inner-active` :`left-nav-inner` }>
            <FaEnvelope /> Messages</div>
               </Link>
            </li>
        </ul>
    </div>
}

export default LeftNavigation