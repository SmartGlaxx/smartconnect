import { addsData } from "./adsData"
import './ads.css'

const Ads =()=>{
let count  = 0
    return<div className="ad-container" >
        {addsData.map(item =>{
            count++
            const {id, name, img, desc} = item
            return <div key={id} className="ad-item">
                {
                         count < 2 && <div className="ad-item-inner">
                             <img src={img} alt={name} className="ad-img-1"/>
                         <div className="ad-img-1-after"></div>
                         </div>
                 }
                { count == 2 && <h3 className="sponsored">Sponsored</h3>}
                    {
                        count >= 2 && count <= 3 &&  <div style={{display:"flex"}}>
                            <img src={img} alt={name} className="ad-img-2 sm-items"/>
                            <h5 className="desc">{desc}</h5>
                        </div>
                    }
               
                {
                         count > 3 && <div className="ad-item-inner">
                             <img src={img} alt={name} className="ad-img-1"/>
                             <div className="ad-img-1-after"></div>
                         </div>
                 }
            </div>
        })}
    </div>
}


export default Ads