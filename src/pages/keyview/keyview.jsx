import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import "./keyview.css"
import Window from '../../compoments/window/window'
import { useStateContext } from '../../reducer'

export default function Keyview() {
    const {keyword} = useParams()
    const {keywordList} = useStateContext()
    const currentKeyword = keywordList.find(item=>item?.name==keyword)

    const windowRef = useRef()
    const stepSize = 720 // px
    const handleNext = () => {
        const target = windowRef.current
        const max = parseInt(target.scrollWidth) - parseInt(target.clientWidth) + 50
        const prev = target.style.left
        let step = Math.max((parseInt(prev) || 0) - stepSize,max*-1)
        target.style.left = `${step}px`
    }

    const handlePrev = () => {
        const target = windowRef.current
        const prev = target.style.left
        let step = Math.min((parseInt(prev) || 0) + stepSize,0)
        target.style.left = `${step}px`
    }


  return (
    <div className='keyview-container'>
        <div className="keyview-keyword-banner">
            <h2>{currentKeyword?.name || "加载中"}</h2>
            <span>发现 <span className='big'>{currentKeyword?.count || 0}</span> 条</span>
        </div>

        <div className="keyview-cube-list">
            <div className="keyview-cube">

            </div>
            <div className="keyview-cube">
                
            </div>
            <div className="keyview-cube">
                
            </div>
            <div className="keyview-cube">
                
            </div>
        </div>

        <div className="keyview-post-list">
            <span className='prev' onClick={handlePrev}> ◀️ </span>
            <span className='next' onClick={handleNext}> ▶️ </span>
            <div className="keyview-wrapper">
                <Window keyword={keyword} ref={windowRef} />
            </div>
        </div>

        <div className="keyview-mediafile-list">

        </div>
    </div>
  )
}
