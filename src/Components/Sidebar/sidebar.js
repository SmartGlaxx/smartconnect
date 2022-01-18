import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {Button, Divider} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './sidebar.css'
import { FaHome, FaPeopleArrows, FaUserFriends, FaEnvelope, FaUserAlt, FaTh, 
    FaBell, FaPlusSquare, FaChevronCircleDown,FaWindowClose, FaTools, FaSignInAlt} from 'react-icons/fa' 
import { UseAppContext } from '../../Contexts/app-context'
import ListIcon from '@material-ui/icons/List';

//for popover starts
const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));
  
  //for popover ends

const Sidebar =()=>{
    const {setLoggedIn, loggedIn, currentUserParsed, sidebarOpen, openSidebar} = UseAppContext()
    const [showDropdown, setShowDropdown] = useState(false)

const {_id, username, firstname, lastname} = currentUserParsed
     //popover function start
     const classes = useStyles();
     const [anchorEl, setAnchorEl] = React.useState(null);
   
     let firstnameCapitalized = '';
     let lastnameCapitalized = ''
     if(firstname){
         firstnameCapitalized = firstname.slice(0,1).toUpperCase().concat(firstname.slice(1).toLowerCase())
     }
 
     if(lastname){
         lastnameCapitalized = lastname.slice(0,1).toUpperCase().concat(lastname.slice(1).toLowerCase())
     }
     
    return <div className={ sidebarOpen ? `sidebarContainer2` : `sidebarContainer1`}  >
        <div className="sidebarTop " xs ={9} sm={3}>
             <div className='sidebarlogo' onClick={openSidebar}>
                <Link to='/' className='mainlogo-link'>SC</Link>
             </div>
            <FaWindowClose className='close-icon' size='25' onClick = {openSidebar}/>
        </div>
        <div className="sideTop" >
            <div className="sideTop-inner">
                <ul className="sideTop-ul">
                     <li className="sideTop-li" onClick={openSidebar}>
                    <Link to={`/userprofile/${_id}/${username}`}  className="left-nav">
                    <div className= {window.location.href.indexOf("userprofile") > -1 ? `sideTop-li-inner-active` :`sideTop-li-inner` }
                    ><FaUserAlt className= {window.location.href.indexOf("userprofile") > -1 ? `icons-active` :`icons`}  size='15'/>
                        Profile </div>
                    </Link>
                    </li>
                    <li className="sideTop-li" onClick={openSidebar}>
                    <Link to='/' className='left-nav'>
                    <div className= {window.location.pathname == '/' ? `sideTop-li-inner-active` :`sideTop-li-inner` }>
                    <FaHome className= {window.location.pathname == '/'? `icons-active` :`icons`}  size='15'/>
                         Home </div>
                    </Link>
                    </li>
                    <li className="sideTop-li" onClick={openSidebar}>
                    <Link to={`/connections/${_id}/${username}`} className='left-nav' >
                    <div className= {window.location.href.indexOf("connections") > -1 ? `sideTop-li-inner-active` :`sideTop-li-inner ` }>
                    <FaPeopleArrows className= {window.location.href.indexOf("connections") > -1 ? `icons-active` :`icons`} size='15'/>
                        Connections </div>
                    </Link>
                    </li>
                    <li className="sideTop-li" onClick={openSidebar}>
                    <Link to={`/follows/${_id}/${username}`} className='left-nav' >
                    <div className= {window.location.href.indexOf("follows") > -1 ? `sideTop-li-inner-active` :`sideTop-li-inner ` }>
                    <FaUserFriends className= {window.location.href.indexOf("follows") > -1 ? `icons-active` :`icons`} size='15'/>
                        Follows </div>
                    </Link>
                    </li>
                    <li className="sideTop-li" >
                    <dix  className='left-nav' >
                     <div className= {window.location.href.indexOf("chat") > -1 ||
                     window.location.href.indexOf("inbox") > -1 || 
                     window.location.href.indexOf("composemessage") > -1 ?
                     `sideTop-li-inner-active message-btn-box` :`sideTop-li-inner message-btn-box`}  >
                    <FaEnvelope className= {window.location.href.indexOf("chat") > -1 || 
                     window.location.href.indexOf("inbox") > -1 || 
                     window.location.href.indexOf("composemessage") > -1 ? `icons-active` :`icons`}  size='15'/>
                        Messages
                     <FaChevronCircleDown  className="icons2" className='dropdown'
                     variant="contained"  onClick={()=>{setShowDropdown(!showDropdown)}}/>
                     </div>
                    </dix>
                    </li>
                </ul> 
            </div>
        </div>
        {showDropdown && <div className='message-options-box'>
        <Button className='link-btn' onClick={openSidebar}
            style={{display:"flex", justifyContent:"flex-start", alignItems:"center",
            width:"100%", padding:"0.3rem 0.5rem"}}>
                <FaPlusSquare className= {window.location.href.indexOf("composemessage") > -1  ? `icons-active` :`icons`} />
                <Link to='/composemessage'  
                className= {window.location.href.indexOf("composemessage") > -1  ? `link-2-active` : `link-2`}>
                    New Message
                </Link>
            </Button>
            <Button className='link-btn' onClick={openSidebar}
            style={{display:"flex", justifyContent:"flex-start", alignItems:"center",
            width:"100%", padding:"0.3rem 0.5rem"}}>
                <FaEnvelope className= {window.location.href.indexOf("inbox") > -1  ? `icons-active` :`icons`} />
                <Link to='/inbox' 
                className= {window.location.href.indexOf("inbox") > -1  ? `link-2-active` : `link-2`}>
                    Inbox
                </Link>
            </Button>
        </div>}
        <div className="sideTop-2" >
            <div className="sideTop-inner">
                <ul className="sideTop-ul">
                    <li className='sideTop-li'>
                        <FaBell  className="icons" size='15'/>
                        Notifications
                    </li>
                    <li className='sideTop-li'>
                        <FaTools  className="icons" size='15'/>
                        Settings
                    </li>
                    {loggedIn && <>
                    {/* <Button className='logout' style={{color: "rgb(236, 39, 39)"}}> */}
                    <li className='sideTop-li logout'>
                        <FaSignInAlt onClick={()=>setLoggedIn(false)} className='logout-icon logout' size='15'/>
                        Sign out
                    </li>
                    {/* </Button> */}
                    </>}
                </ul>
            </div>
        </div> 
        
    </div>
}

export default Sidebar
