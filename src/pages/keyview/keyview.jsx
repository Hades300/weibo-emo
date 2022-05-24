import React, { useCallback, useEffect, useRef,useState} from 'react'
import { useParams } from 'react-router-dom'
import "./keyview.css"
import Window from '../../compoments/window/window'
import { useStateContext } from '../../reducer'
import {fetchMediaList} from '../../utils'
import ImageViewer from "react-simple-image-viewer";
import useWindowDimensions from '../../hooks/useWindowDimensions'
import Sentiment from '../../compoments/sentiment/sentiment'
import Kollist from '../../compoments/kollist/kollist'

export default function Keyview() {
    const {keyword} = useParams()
    const {width,height} = useWindowDimensions()
    let emotionNum = parseInt(width) > 1568 ? 8 : 6
    emotionNum = parseInt(width) > 1900 ? 10 : emotionNum

    const {keywordList,updateMediaListByKeyword,mediaListByKeyword,emotionTagByName} = useStateContext()
    const updateMedia = useCallback((media)=> updateMediaListByKeyword(keyword,media),[keyword])

    const currentKeyword = keywordList.find(item=>item?.name==keyword)
    console.log(currentKeyword)
    const currentMedia = mediaListByKeyword[keyword] || {}
    const currentImageMedia = (currentMedia.images || []).slice(0,15)
    const currentVideoMedia = currentMedia.videos || []

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

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


    // init media data
    useEffect(()=>{
        fetchMediaList(keyword)
        .then(updateMedia)
        .catch(err=>{
            console.log("keyview fetchMediaList err:",err)
        })
    },[])


  return (
    <div className='keyview-container'>
        <div className="keyview-keyword-banner">
            <h2>{currentKeyword?.name || "加载中"}</h2>
            <span>发现 <span className='big'>{currentKeyword?.count || 0}</span> 条</span>
        </div>

        <div className="keyview-cube-list">
            <div className="keyview-cube">
                <div className="emotion-analyse">
                    <h3>常用表情统计</h3>
                    <ul>
                        {
                            Array.prototype.map.call(currentKeyword?.emotion_top_10.slice(0,emotionNum) || {},(item,index)=>{
                                return (
                                    <li key={index}>
                                        <span dangerouslySetInnerHTML={{__html:emotionTagByName(item.name) || '未收录'}}></span>
                                        <span>{(parseFloat(item?.percent)*100).toFixed(2)+"%" || "???"}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="keyview-cube">
                <div className="word-cloud">
                    { currentKeyword?.word_cloud_url && <img src={currentKeyword?.word_cloud_url} alt="" />}
                </div>
            </div>
            <div className="keyview-cube">
                <div className="sentiment-wrapper">
                    <Sentiment sentiments={currentKeyword?.sentiment_distribution || []}/>
                </div>
            </div>
            <div className="keyview-cube">
                <div className="kol-wrapper">
                    <Kollist kollist={currentKeyword?.kol_top_10 || []}/>
                </div>
            </div>
        </div>

        <div className="keyview-post-list">
            <span className='prev' onClick={handlePrev}> ◀️ </span>
            <span className='next' onClick={handleNext}> ▶️ </span>
            <div className="keyview-wrapper">
                <Window keyword={keyword} ref={windowRef} count={currentKeyword.count} />
            </div>
        </div>

        <div className="keyview-mediafile-list" style={{display:"flex"}}>
            {
                Array.prototype.map.call(currentImageMedia,(url,index)=>{
                    return (
                        <div className="keyview-mediafile-item" key={index} onClick={()=>{openImageViewer(index)}}>
                            <img src={url} />
                        </div>
                    )
                })
            }
            {
                isViewerOpen && (<ImageViewer
                    src={ currentImageMedia }
                    currentIndex={ currentImage }
                    disableScroll={ false }
                    closeOnClickOutside={ true }
                    onClose={ closeImageViewer }
                  />)
            }
        </div>
    </div>
  )
}
