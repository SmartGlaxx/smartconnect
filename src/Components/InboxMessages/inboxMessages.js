import { Button, Grid } from "@material-ui/core"
import { UseAppContext } from "../../Contexts/app-context"
import { Topbar, Sidebar, Backdrop } from "../../Components"
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { FaImages, FaSearch, FaPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import axios from 'axios'
import LoadingIcons from 'react-loading-icons'
import { LeftNavigation } from '../../Components'
import Profile from "../../assets/profile.jfif"
import { Ads } from '../../Components'

const InboxMessages = ({})=>{

    const {loading, loggedIn, allUsers, currentUserParsed} = UseAppContext()
    const [newAllMessages, setNewAllMessages] = useState([])
    const [userUniqueIds, setUserUniqueIds] = useState([])
    const [fetchedUsers, setFetchedUsers] = useState([])
    const  {_id : userId, username : userUsername, messageNotifications } = currentUserParsed
    const messageUrl =  `https://smart-job-search.herokuapp.com/api/v1/messages/${userId}/${userUsername}`
    const [usersWithMessages, setUsersWithMessages] = useState([])

    const newUsersWithMessages = []

    const fetchUserMessages = async(url)=>{
      
        const options = {
            url: url,
            method : "GET",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json;charset=UTF-8"
            }
        }
        
       // dispatch({type : LOADING, payload : true})
    
        const result = await Axios(options)
        
        const {response, allUserMessages} = result.data
        
        if(response == 'Success' && allUserMessages){
            
           const newAllUserMessages = allUserMessages.sort((a,b)=>{
               return a.senderId - b.senderId
           })
           setNewAllMessages(newAllUserMessages)
        }else if(response == 'Fail'){
        //    setError({status : true, msg : "Fialed to fetch timeline posts"})
           return setTimeout(()=>{
                // setError({status : false, msg :''})
        }, 4000)
        }
        
    }

useEffect(()=>{
    fetchUserMessages(messageUrl)
},[fetchedUsers])

const filterMessages = ()=>{
    
    const filteredSent = [...new Set(newAllMessages.map(item => item.senderId))] 
    const filteredReceived = [...new Set(newAllMessages.map(item => item.receiverId))]  
    const filtered = [...new Set(filteredSent.concat(filteredReceived))]  
    setUserUniqueIds(filtered)

}

useEffect(()=>{
  filterMessages()
},[newAllMessages])



const fetchUsers = async(fetchurl)=>{
    const result = await axios(fetchurl)
    const fetchedUserVal = result.data.usersData 
    setFetchedUsers(fetchedUserVal)

}

useEffect(()=>{
    fetchUsers(`https://smart-job-search.herokuapp.com/api/v1/user`)
},[newAllMessages, userUniqueIds])

const setUsersMessages = ()=>{
    fetchedUsers.length && userUniqueIds.length && fetchedUsers.map(user =>{
        if(userUniqueIds.includes(user._id) && user._id !== userId  ){
            // const {_id : id, username : otherUsername, firstname, lastname, profilePicture} = user
            newUsersWithMessages.push(user)
            setUsersWithMessages(newUsersWithMessages)
        }
    })
}

useEffect(()=>{
    setUsersMessages()
},[fetchedUsers])

// usersWithMessages.sort((a,b)=>{
    //     if(a.setNewAllMessages)
    // })
    //    const sentMessagesSorted =()=>{
        //    if(a.sentMessages.length > 0){

const sortUsersMessageByTime = ()=>{
   let idss = usersWithMessages.sort((a,b) =>{
            return  b.firstname - a.firstname
        })
        console.log(usersWithMessages)
    }
    
    // return new Date(b.sentMessages[b.sentMessages.length - 1].createdAt) - new Date(a.sentMessages[a.sentMessages.length - 1].createdAt)
// }
//    } 

//    sentMessagesSorted()


useEffect(()=>{
    sortUsersMessageByTime()
},[fetchedUsers])

//  console.log(usersWithMessages)

    return <div>
         {
            usersWithMessages.length ? usersWithMessages.map(user => {
        
            // if(userUniqueIds.includes(user._id) && user._id !== userId  ){
                const {_id : id, username : otherUsername, firstname, lastname, profilePicture} = user
                // let otherUername
                // if(otherUsername){
                //     otherUername = otherUsername.slice(0,1).toUpperCase().concat(otherUsername.slice(1).toLowerCase())
                // }
                // return <div className='inbox-userbox'>
                    
                    if(messageNotifications.includes(id)){
                        return <div className='inbox-userbox' >
                            <Link to={`/chat/${userId}/${userUsername}/${id}/${otherUsername}`} className='inbox-name'>
                            <div className='inbox-items'>
                                <img src={profilePicture ? profilePicture : Profile} className='inbox-photo'/>
                                <span className='inbox-name'>{`${firstname} ${lastname}`}</span>
                                <div className='unread-message'></div>
                            </div>
                            </Link>
                        </div>
                    }else if(!messageNotifications.includes(id)){
                        return <div className='inbox-userbox'>
                            <Link to={`/chat/${userId}/${userUsername}/${id}/${otherUsername}`} className='inbox-name'>
                            <div className='inbox-items'>
                                <img src={profilePicture ? profilePicture : Profile} className='inbox-photo'/>
                                <span className='inbox-name'>{`${firstname} ${lastname}`}</span>
                            </div>
                            </Link>
                        </div>
                    }
                    
                    // {
                    
                    // }
                    
                    // <br/>

                    
            // }
            })
             : 
            <div style={{width: "100%",height : "5rem", 
                display: 'grid', placeItems: "center"}}>
                <h4 className='no-message'>No Messages in your inbox</h4>
                <LoadingIcons.Puff  stroke="#555" strokeOpacity={.9} />
            </div>  
    }
    </div>
}


export default InboxMessages