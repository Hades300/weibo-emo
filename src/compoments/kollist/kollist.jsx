import React from 'react'
import "./kollist.css"

const userPlaceholder = {
    screen_name:"空",
    profile_image_url:"/account.png",
    uid:0
}

export default function Kollist({kollist = []}) {
    let kol_top4 = Array.prototype.slice.call(kollist, 0, 4)
    while (kol_top4.length < 4) {
        kol_top4.push(userPlaceholder)
    }
    // navigate to user profile
    const handleClick = (uid) => { window.open(`https://weibo.com/u/${uid}`) }
  return (
    <div className="kollist-container">
        {
            Array.prototype.map.call(kol_top4, ({ screen_name, profile_image_url,uid }, index) => {
                return (<div key={screen_name}>
                <img src={profile_image_url} alt={screen_name} onClick = {()=>{handleClick(uid)}}/>
                    <span className="kol-name" onClick = {()=>{handleClick(uid)}}>{screen_name}</span>
                </div>)
            })
        }
    </div>
  )
}
