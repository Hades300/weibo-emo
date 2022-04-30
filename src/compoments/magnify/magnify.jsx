import React,{useState} from 'react'
import "./magnify.css"
import { getMobileURL } from '../../utils';

export default function Magnify() {
    const [payload,setPayload] = useState("");

    const tabs = [
        // {
        //     text:"跳转桌面版",
        //     icon:"",
        //     key:"desktop",
        //     class:"jump-desktop"
        // },
        {
            text:"跳转移动版",
            icon:"",
            key:"mobile",
            class:"jump-mobile"
        },
        // {
        //     text:"跳转WAP",
        //     icon:"",
        //     key:"wap",
        //     class:"jump-wap"
        // }
    ]

    const openWindow = (url) => {
        window.open(url)
    }
  return (
    <div className="magnify-container">
        <input type="text" className="weibo-url-or-id-input" value={payload} onChange={(e)=>{e.preventDefault();setPayload(e.target.value)}}/>
        <button>解析</button>
        <div className="jump-button">
            {
                Array.prototype.map.call(tabs,(tab,index)=>{
                    return <button key={index} className={tab.class} onClick={()=>{openWindow(getMobileURL(payload))}}>{tab.text}</button>
                })
            }
        </div>
    </div>
  )
}
