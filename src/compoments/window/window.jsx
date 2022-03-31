import React from 'react'
import { useStateContext } from '../../reducer'
import "./window.css"

export default function Window() {
    const {latestWeiboCards} = useStateContext()

  return (
    <div className="window-container">
        <h2>Latest Post</h2>
        <div className="window-real-container">
        {
            Array.prototype.map.call(latestWeiboCards,({text,id,like_count,repost_count,utc_created,uid},index)=>{
                return (
                    <div className="window-item" key={id}>
                        <div className="window-item-content">
                            {text}
                        </div>
                        <div className="window-item-statistic">
                            <span>{like_count+"👍"}</span>
                            <span>{repost_count+"🔁"}</span>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}
