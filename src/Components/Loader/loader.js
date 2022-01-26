import LoadingIcons from 'react-loading-icons'
import './loader.css'


const Loader = ()=>{
    return <div style={{width: "100%",height : "100vh", 
    display: 'grid', placeContent: "center", placeItems:"center"}}>
        <h1 className='loader-title'>Smart Connect</h1>
       <LoadingIcons.Puff  stroke="var(--color-7)" strokeOpacity={.9} />
   </div>
}

export default Loader